import { click } from '@testing-library/user-event/dist/click'
import { action, computed, thunk } from 'easy-peasy'
import { SetIncDec } from '../base/base.types.d'
import { autoclickers } from './autoclicker'
import { calcNext, calcTotal } from './autoclicker.logic'
import { AutoClickerV2Model } from './autoclicker.model'

export const initialAutoClickerV2Model: AutoClickerV2Model = {
  /* Properties */
  autoclickers: [...autoclickers],
  cps: computed([
    (state)=>state.autoclickers.map(({owned, cps})=>owned*cps)
  ],(cpsArray)=>cpsArray.reduce((prev,curr)=>curr+=prev)),

  /* Dispatches */
  dispatchPurchase: thunk((actions, { label, amount }, helpers) => {
    const state = helpers.getState()
    const storeState = helpers.getStoreState().v2
    const storeActions = helpers.getStoreActions().v2

    const clicker = state.autoclickers.find(
      (clicker) => clicker.label === label
    )
    if (!clicker)
      return helpers.fail(
        new Error(`No AutoClicker with label \`${label}\` found.`)
      )

    const count = storeState.base.count
    const { total, next } = actions.getCosts({ amount, payload: clicker })
    const hasFunding = count >= total
    if (!hasFunding) return helpers.fail(new Error('Missing Funds.'))

    storeActions.base.setCount({ type: SetIncDec.DECREASE, payload: total })
    actions.setCosts({ payload: clicker, type: SetIncDec.SET, amount: next })
    actions.setOwned({ payload: clicker, type: SetIncDec.INCREASE, amount })
  }),
  dispatchUseCps: thunk((actions,_,helpers)=>{
    const storeActions = helpers.getStoreActions();
    const state = helpers.getState();
    storeActions.v2.base.setCount({type: SetIncDec.INCREASE, payload: state.cps});
  }),

  /* Services */
  setOwned: action((state, payload) => {
    const { amount, type } = payload
    if (type === SetIncDec.SET) {
      payload.payload.owned = amount
    } else if (type === SetIncDec.INCREASE) {
      payload.payload.owned += amount
    } else if (type === SetIncDec.DECREASE) {
      payload.payload.owned -= amount
    }
  }),
  setCps: action((state, payload) => {
    const { type, amount } = payload
    if (type === SetIncDec.SET) {
      payload.payload.cps = amount
    } else if (type === SetIncDec.INCREASE) {
      payload.payload.cps += amount
    } else if (type === SetIncDec.DECREASE) {
      payload.payload.cps -= amount
    }
  }),
  setCosts: action((state, payload) => {
    const { type, amount } = payload
    if (type === SetIncDec.SET) {
      payload.payload.cost = amount
    } else if (type === SetIncDec.INCREASE) {
      payload.payload.cost += amount
    } else if (type === SetIncDec.DECREASE) {
      payload.payload.cost -= amount
    }
  }),
  unlock: action((state, clicker) => {
    clicker.unlocked = true
  }),

  getCosts: thunk((actions, payload, helpers) => {
    const clicker = payload.payload
    if(!click) return helpers.fail(new Error("No clicker given"));

    const cost = clicker.cost;
    const increase = clicker.costIncrease;
    const {amount} = payload;
    const total = calcTotal({cost, increase, amount});
    const next = calcNext({cost,increase,amount});

    return { total, next }
  }),
}
