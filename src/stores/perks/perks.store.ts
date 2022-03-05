import {
  action,
  computed,
  createContextStore,
  createTypedHooks,
  thunk,
} from 'easy-peasy'
import { perks } from './perks'
import {  IPerk, PerkCategoryName, PerksModel } from './perks.model'
import { enableMapSet } from 'immer'

enableMapSet()

export const initialPerksData: PerksModel = {
  perks: perks,
  cps: computed(
    [
      (state) => {
        const entries = Object.entries(state.perks);
        return entries
          .map(([categoryName, category]) => {
            return category
              .map((perk) => {
                return perk.cps * perk.owned
              })
              .reduce((prev, curr) => (curr += prev), 0)
          })
          .reduce((prev, curr) => (curr += prev), 0)
      },
    ],
    (num) => num
  ),
  buy: thunk((state, payload, helpers) => {
    const categories = Object.keys(helpers.getState().perks);
    const perk = Object.values(helpers.getState().perks).flatMap((e)=>e).find((p)=>p.label === payload.label);
    if(!perk) return;

    if(helpers.getStoreState().base.clicks < perk.cost) return;
    perk.owned += payload.amount;
    helpers.getStoreActions().base.decrease(perk.cost);


  }),
  sell: action((state,payload)=>{
    // TODO
  }),
  unlock: action((state,label)=> {
    const perk = Object.values(state.perks).flatMap((e)=>e)?.find((p)=>p.label === label);
    if(!perk) return;
    perk.unlocked = true;
  })
}
export const PerksStore = createContextStore(initialPerksData)

export const {
  useStoreActions: usePerksActions,
  useStoreState: usePerksState,
  useStoreDispatch: usePerksDispatch,
  useStore,
} = createTypedHooks<PerksModel>()
