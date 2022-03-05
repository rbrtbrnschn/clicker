import { PersistStorage } from 'easy-peasy'
import { StoreModel } from '.'
import { badges } from './badges/badges'
import { upgrades } from './upgrades/upgrades'
type StorageEngine =
  | typeof localStorage
  | typeof sessionStorage
  | PersistStorage
  | undefined
export const storageEngine: StorageEngine = {
  getItem: (key: any): any => {
    const rawData = localStorage.getItem(key)
    if (!rawData) return

    const data = JSON.parse(rawData) as StoreModel
    data.isRehydrated = true
    data.events.event = null
    data.base.clickStrengthModifier = 1

    data.badges.badges = data.badges.badges.map((b, i) => {
      return { ...badges[i], ...b }
    })
   
    data.upgrades.upgrades = data.upgrades.upgrades.map((u,i)=>{
      const upgrade = {...upgrades[i],...u};
      return upgrade;
    })
    return data
  },
  setItem: (key: any, data: StoreModel): any => {
    return new Promise((resolve, reject) => {
      localStorage.setItem(key, JSON.stringify(data))
      return resolve(true)
    })
  },

  removeItem: (key: any) => {},
}
