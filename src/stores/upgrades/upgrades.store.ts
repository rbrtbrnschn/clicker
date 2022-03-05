import { action, thunk } from "easy-peasy";
import { upgrades } from "./upgrades";
import { IUpgrade, UpgradesModel } from "./upgrades.model";

export const initialUpgradesData: UpgradesModel= {
  upgrades,
  upgrade: action((state,label)=>{
    const upgrade = state.upgrades.find((u)=>u.label === label);
    if(!upgrade) return;
    if(upgrade.isMaxed) return;

    upgrade.level ++;
    if(upgrade.level === upgrade.levels.length) upgrade.isMaxed = true;
  }),
  dispatchUpgrade: thunk((state, label, helpers)=>{
    const upgrade = helpers.getState().upgrades.find((u)=>u.label === label);
    if(!upgrade) return;
    const level = upgrade.levels[upgrade.level];
    
    if(level.cost > helpers.getStoreState().base.clicks) return;

    level.callback(helpers);
    state.upgrade(label);
    helpers.getStoreActions().base.decrease(level.cost);

  }),
  reset: action((state)=>{
    state.upgrades = upgrades;
  })

}
