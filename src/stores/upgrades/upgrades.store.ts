import { action, thunk } from "easy-peasy";
import { upgrades } from "./upgrades";
import { IUpgrade, UpgradesModel } from "./upgrades.model";

export const initialUpgradesData: UpgradesModel= {
  upgrades,
  upgrade: thunk((state, label, helpers)=>{
    const upgrade = helpers.getState().upgrades.find((u)=>u.label === label);
    if(!upgrade) return;
    if(upgrade.isMaxed) return;
    
    if(upgrade.cost > helpers.getStoreState().base.clicks) return;
    helpers.getStoreActions().base.decrease(upgrade.cost);

    upgrade.runCallback(helpers);

    if(upgrade.callback.length === upgrade.level) {
      upgrade.isMaxed = true;
      return;
    }

  })

}
