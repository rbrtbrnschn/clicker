import { IBadge } from './badges.model'

export const badges: IBadge[] = [
  {
    label: 'My First Badge',
    achieved: false,
    condition: (helpers) => {
      return helpers.getStoreState().v1.base.clicks >= 0.5
    },
    onAchieved: (helpers) => {
      helpers.getStoreActions().v1.base.increase(5)
    },
    dependency: ['clicks'],
  },
  {
    label: 'My Second Badge',
    achieved: false,
    condition: (helpers) => {
      return helpers.getStoreState().v1.base.history.length >= 10
    },
    onAchieved: (helpers) => {
      helpers.getStoreActions().v1.base.increase(10)
    },
    dependency: ['clicks'],
  },
  {
    label: '100 Clicks!',
    achieved: false,
    condition: (helpers) => {
      return helpers.getStoreState().v1.base.history.length >= 2500
    },
    onAchieved: (helpers) => {
      helpers.getStoreActions().v1.perks.unlock("My First Other Perk");
    },
    dependency: ['clicks'],
  },
]
