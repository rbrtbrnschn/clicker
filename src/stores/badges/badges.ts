import { IBadge } from './badges.model'

export const badges: IBadge[] = [
  {
    label: 'My First Badge',
    achieved: false,
    condition: (helpers) => {
      console.log('checking 1')
      return helpers.getStoreState().base.clicks >= 0.5
    },
    onAchieved: (helpers) => {
      helpers.getStoreActions().base.increase(5)
    },
    dependency: ['clicks'],
  },
  {
    label: 'My Second Badge',
    achieved: false,
    condition: (helpers) => {
      console.log('checking 2')
      return helpers.getStoreState().base.history.length >= 10
    },
    onAchieved: (helpers) => {
      helpers.getStoreActions().base.increase(10)
    },
    dependency: ['clicks'],
  },
]
