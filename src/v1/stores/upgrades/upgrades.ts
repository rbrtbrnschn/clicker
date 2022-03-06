import { Helpers } from 'easy-peasy'
import { StoreModel } from '../../../store'
import { IUpgrade, UpgradesModel } from './upgrades.model'

export const upgrades: IUpgrade[]= [
  {
    label: 'Click Strength',
    category: 'basic',
    cost: 10,
    level: 0,
    levels: [
      {
        cost: 10,
        description: "Click Strength + 0.5",
        callback: (helpers) => {
          helpers.getStoreActions().v1.base.increaseClickStrengthBase(0.5)
        },
      },
      {
        cost: 20,
        description: "Click Strength + 1",
        callback: (helpers) => {
          helpers.getStoreActions().v1.base.increaseClickStrengthBase(1)
        },
      },
    ],
    isMaxed: false,
  },
]
