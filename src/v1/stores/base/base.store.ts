import {
  action,
  computed,
  createContextStore,
  createTypedHooks,
  thunk,
} from 'easy-peasy'
import { BaseModel } from './base.model'
import {config} from "../../config";

export const initialBaseData: BaseModel = {
  clicks: config.base.clicks,
  clickStrengthBase: config.base.clickStrengthBase,
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
      const cps = helpers.getStoreState().v1.perks.cps
      state.increase(cps)
    }, 1000)
  }),

  increaseClickStrengthBase: action((state,delta)=>{
    state.clickStrengthBase += delta;
  }),

  reset: action((state)=>{
    state.clickStrengthModifier = 1;
    state.clicks = config.base.clicks;
    state.history = [];
    state.clickStrengthBase = config.base.clickStrengthBase;
  })
  
}
export const BaseStore = createContextStore(initialBaseData)

export const {
  useStoreActions: useBaseActions,
  useStoreState: useBaseState,
  useStoreDispatch: useBaseDispatch,
} = createTypedHooks<BaseModel>()
