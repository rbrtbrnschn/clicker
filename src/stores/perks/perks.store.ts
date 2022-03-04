import {
  action,
  computed,
  createContextStore,
  createTypedHooks,
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
  buy: action((state, payload) => {
    const categories = Array.from(state.perks.keys())
    const category = categories.find((category) => {
      return state.perks
        .get(category)
        ?.find((perk) => perk.label === payload.label)
    });
    const perk = state.perks.get(category as ICategory)?.find((p)=>p.label === payload.label);
    if(!perk) return;
    perk.owned += payload.amount;

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
