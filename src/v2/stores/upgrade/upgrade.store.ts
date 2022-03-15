import { action, computed, thunk } from 'easy-peasy'
import { SetIncDec } from '../base/base.types.d'
import { findUpgradeByLabel } from './upgrade.logic'
import { UpgradeModelV2 } from './upgrade.model'
import { upgrades } from './upgrades'

export const initialUpgradeV2Data: UpgradeModelV2 = {
  /* Properties */
  upgrades: upgrades,

  /* Dispatches */
  dispatchPurchase: thunk((actions, label, helpers) => {
    const state = helpers.getState()

    const upgrade = state.upgrades.find(findUpgradeByLabel(label))
    if (!upgrade)
      return helpers.fail(new Error('no upgrade found with that label'))

    if(upgrade.isBought) return helpers.fail(new Error("upgrade has been bought"));

    const hasFunding = actions.hasFunds(upgrade);
    if (!hasFunding) return helpers.fail(new Error("Insufficient funds"));
    actions.chargeUser(upgrade);
    actions.toggleIsBought(upgrade);

    actions.runCallback(upgrade);
  }),

  /* Services */
  toggleIsBought: action((state, upgrade)=>{
    upgrade.isBought = !upgrade.isBought;
  }),
  runCallback: thunk((_, upgrade, helpers) => {
    upgrade.callback(helpers)
  }),
  chargeUser: thunk((actions,upgrade,helpers)=>{
    const storeActions = helpers.getStoreActions().v2;
    storeActions.base.setCount({type: SetIncDec.DECREASE, payload: upgrade.cost});
  }),
  hasFunds: thunk((actions,upgrade,helpers) => {
    const storeState = helpers.getStoreState().v2;
    const hasFunds = storeState.base.count >= upgrade.cost;
    return hasFunds;
  })
}
