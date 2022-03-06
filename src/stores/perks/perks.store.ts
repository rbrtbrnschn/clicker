import {
  action,
  computed,
  createContextStore,
  createTypedHooks,
  thunk,
} from 'easy-peasy'
import { perks,getInitialPerks } from './perks'
import {  IPerk, PerkCategoryName, PerksModel } from './perks.model'
import { enableMapSet } from 'immer'

enableMapSet()

export const initialPerksData: PerksModel = {
  perks: getInitialPerks(),
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
    const perk = Object.values(helpers.getState().perks).flatMap((e)=>e).find((p)=>p.label === payload.label);
    if(!perk) return;

    // TODO check logic
    const myPerk = {
      cost: 10,
      label: "My First Perk",
      owned: 1,
      costIncrease: 1.1,
    }
    if(helpers.getStoreState().base.clicks < perk.cost) return;
    helpers.getStoreActions().base.decrease(perk.cost);

    perk.cost += (perk.owned + 1 * perk.costIncrease);
    perk.owned += payload.amount;


  }),
  sell: action((state,payload)=>{
    // TODO
  }),
  unlock: action((state,label)=> {
    const perk = Object.values(state.perks).flatMap((e)=>e)?.find((p)=>p.label === label);
    if(!perk) return;
    perk.unlocked = true;
  }),

  reset: action((state)=>{
    const oldPerks = getInitialPerks();
    state.perks = oldPerks;
  })
}
export const PerksStore = createContextStore(initialPerksData)

export const {
  useStoreActions: usePerksActions,
  useStoreState: usePerksState,
  useStoreDispatch: usePerksDispatch,
  useStore,
} = createTypedHooks<PerksModel>()
