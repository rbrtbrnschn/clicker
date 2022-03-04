import {
  action,
  computed,
  createContextStore,
  createTypedHooks,
  thunk,
} from 'easy-peasy'
import { perks } from './perks'
import { ICategory, IPerk, PerksModel } from './perks.model'
import { enableMapSet } from 'immer'

enableMapSet()

export const initialPerksData: PerksModel = {
  perks: perks,
  cps: computed(
    [
      (state) => {
        const entries = Array.from(state.perks.entries())
        return entries
          .map(([_, category]) => {
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
    const categories = Array.from(helpers.getState().perks.keys())
    const category = categories.find((category) => {
      return helpers.getState().perks
        .get(category)
        ?.find((perk) => perk.label === payload.label)
    });
    const perk = helpers.getState().perks.get(category as ICategory)?.find((p)=>p.label === payload.label);
    if(!perk) return;

    if(helpers.getStoreState().base.clicks < perk.cost) return;
    perk.owned += payload.amount;
    helpers.getStoreActions().base.decrease(perk.cost);


  }),
  sell: action((state,payload)=>{
    // TODO
  }),
  unlock: action((state,label)=> {
const categories = Array.from(state.perks.keys())
    const category = categories.find((category) => {
      return state.perks
        .get(category)
        ?.find((perk) => perk.label === label)
    });
    const perk = state.perks.get(category as ICategory)?.find((p)=>p.label === label);
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
