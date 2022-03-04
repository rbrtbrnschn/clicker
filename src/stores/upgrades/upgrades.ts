import { Helpers } from 'easy-peasy'
import { StoreModel } from '..'
import { IUpgrade, UpgradesModel } from './upgrades.model'

export class Upgrade implements IUpgrade{
  label: string
  category: string
  cost: number
  level: number
  callback: ((helpers: Helpers<UpgradesModel, StoreModel, any>) => number)[]
  isMaxed: boolean

  constructor(
    label: string,
    category: string,
    cost: number,
    level: number,
    callback: ((helpers: Helpers<UpgradesModel, StoreModel, any>) => number)[],
    isMaxed: boolean
  ) {
    this.label = label
    this.category = category
    this.cost = cost
    this.level = level
    this.callback = callback
    this.isMaxed = false
  }
  setCost(newCost: number) {
    this.cost = newCost
  }
  setLevel(newLevel: number) {
    this.level = newLevel;
  }
  runCallback(helpers: Helpers<UpgradesModel,StoreModel, any>){
    const nextCost = this.callback[this.level](helpers);
    this.setLevel(this.level+1);
    this.setCost(nextCost);
  }
}
export const upgrades  = [
  new Upgrade(
    'Click Strength',
    'basic',
    10,
    0,
    [
      (helpers) => {
        helpers.getStoreActions().base.increaseClickStrengthBase(0.5)
        return 20;
      },
      (helpers) => {
        helpers.getStoreActions().base.increaseClickStrengthBase(1)
        return 0;
      },

    ],
    false
  ),
]
