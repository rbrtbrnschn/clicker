import { thunk } from "easy-peasy";
import { UtilsModel } from "./utils.model";

export const initialUtilsData: UtilsModel = {
  reset: thunk((actions,_,helpers)=> {
    const storeActions = helpers.getStoreActions();
    storeActions.base.reset();
    storeActions.badges.reset();
    storeActions.events.reset();
    storeActions.perks.reset();
    storeActions.upgrades.reset();
    storeActions.prestige.reset();
  })

}
