import {
  createStore,
  createTypedHooks,
  unstable_effectOn,
  Unstable_EffectOn,
  persist
} from 'easy-peasy'
import { initialBadgesData } from './badges/badge.store'
import { BadgesModel } from './badges/badges.model'
import { BaseModel } from './base/base.model'
import { initialBaseData } from './base/base.store'
import { EventsModel } from './events/events.model'
import { initialEventsData } from './events/events.store'
import { PerksModel } from './perks/perks.model'
import { initialPerksData } from './perks/perks.store'
import { UpgradesModel } from './upgrades/upgrades.model'
import { initialUpgradesData } from './upgrades/upgrades.store'

export interface StoreModel {
  base: BaseModel
  events: EventsModel
  perks: PerksModel
  badges: BadgesModel
  upgrades: UpgradesModel
  onClicks: Unstable_EffectOn<StoreModel, StoreModel>
}

const initialData: StoreModel = {
  base: initialBaseData,
  events: initialEventsData,
  perks: initialPerksData,
  badges: initialBadgesData,
  upgrades: initialUpgradesData,
  onClicks: unstable_effectOn(
    [(state,storeState) => {
      console.log(storeState)
      return state.base.clicks
    }],
    (actions, change, helpers) => {
      const myState = helpers.getStoreState()
      const myActions = helpers.getStoreActions()
      myState.badges.badges.forEach((b) => {
        if (b.achieved) return

        const achieved = b.condition(helpers)
        if (!achieved) return

        myActions.badges.completeBadge(b.label)
        myActions.badges.completeBadge(b.label)
        b.onAchieved(helpers)
      })
      return undefined
    }
  ),
}
export const store = createStore<StoreModel>(initialData)

export const { useStoreActions, useStoreState, useStoreDispatch, useStore } =
  createTypedHooks<StoreModel>()
