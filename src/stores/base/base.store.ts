import {
  action,
  computed,
  createContextStore,
  createTypedHooks,
  thunk,
} from 'easy-peasy'
import { BaseModel } from './base.model'

export const initialBaseData: BaseModel = {
  clicks: 0.1,
  clickStrengthBase: 0.1,
  clickStrengthModifier: 1,
  clickStrength: computed(
    (state) => state.clickStrengthBase * state.clickStrengthModifier
  ),

  history: [],
  totalClicks: computed((state) => state.history.length),

  click: action((state) => {
    const clickStrength = state.clickStrength

    const { clicks: prior } = state
    state.clicks += clickStrength
    const { clicks: after } = state

    const historyEntry = { prior, after, created_at: new Date(), clickStrength }
    state.history.push(historyEntry)
  }),
  setClickStrengthBase: action((state, base) => {
    state.clickStrengthBase = base
  }),
  setClickStrengthModifier: action((state, modifier) => {
    state.clickStrengthModifier = modifier
  }),
  increase: action((state, delta) => {
    state.clicks += delta
  }),
  decrease: action((state, delta) => {
    state.clicks -= delta
  }),
  set: action((state, clicks) => {
    state.clicks = clicks
  }),
  interval: thunk((state, _, helpers) => {
    setInterval(() => {
      const cps = helpers.getStoreState().perks.cps
      state.increase(cps)
    }, 1000)
  }),

  increaseClickStrengthBase: action((state,delta)=>{
    state.clickStrengthBase += delta;
  })
  
}
export const BaseStore = createContextStore(initialBaseData)

export const {
  useStoreActions: useBaseActions,
  useStoreState: useBaseState,
  useStoreDispatch: useBaseDispatch,
} = createTypedHooks<BaseModel>()
