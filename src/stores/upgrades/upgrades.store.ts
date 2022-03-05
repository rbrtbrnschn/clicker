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
    
    if(upgrade.cost > helpers.getStoreState().base.clicks) return;

    upgrade.levels[upgrade.level].callback(helpers);
    state.upgrade(label);
    helpers.getStoreActions().base.decrease(upgrade.cost);

  })

}
