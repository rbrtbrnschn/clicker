import {
  createStore,
  createTypedHooks,
  unstable_effectOn,
  Unstable_EffectOn,
  persist,
} from 'easy-peasy'
import { initialBadgesData } from './badges/badge.store'
import { badges } from './badges/badges'
import { BadgesModel } from './badges/badges.model'
import { BaseModel } from './base/base.model'
import { initialBaseData } from './base/base.store'
import { storageEngine } from './engine'
import { EventsModel } from './events/events.model'
import { initialEventsData } from './events/events.store'
import { PerksModel } from './perks/perks.model'
import { initialPerksData } from './perks/perks.store'
import { PrestigeModel } from './prestige/prestige.model'
import { initialPrestigeData } from './prestige/prestige.store'
import { UpgradesModel } from './upgrades/upgrades.model'
import { initialUpgradesData } from './upgrades/upgrades.store'
import { UtilsModel } from './utils/utils.model'
import { initialUtilsData } from './utils/utils.store'

export interface StoreModel {
  base: BaseModel
  events: EventsModel
  perks: PerksModel
  badges: BadgesModel
  upgrades: UpgradesModel
  utils: UtilsModel;
  prestige: PrestigeModel;
  onClicks: Unstable_EffectOn<StoreModel, StoreModel>
}

const initialData: StoreModel = {
  base: initialBaseData,
  events: initialEventsData,
  perks: initialPerksData,
  badges: initialBadgesData,
  upgrades: initialUpgradesData,
  utils: initialUtilsData,
  prestige: initialPrestigeData,
  onClicks: unstable_effectOn(
    [
      (state, storeState) => {
        console.log(state)
        return state.base.clicks
      },
    ],
    (actions, change, helpers) => {
      const myState = helpers.getStoreState()
      const myActions = helpers.getStoreActions()
      myState.badges.badges.forEach((b) => {
        if (b.achieved) return

        const achieved = b.condition(helpers)
        if (!achieved) return

        myActions.badges.completeBadge(b.label)
        b.onAchieved(helpers)
      })
      return undefined
    }
  ),
}
export const store = createStore<StoreModel>(
  persist(initialData, {
    storage: storageEngine
})
)

export const { useStoreActions, useStoreState, useStoreDispatch, useStore } =
  createTypedHooks<StoreModel>()
