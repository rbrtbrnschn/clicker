import { PersistStorage } from 'easy-peasy'
import { StoreModelV1 } from '.';
import { StoreModel } from '../../store';
import { badges } from './badges/badges'
import { upgrades } from './upgrades/upgrades'
import { IUpgrade } from './upgrades/upgrades.model'
type StorageEngine =
  | typeof localStorage
  | typeof sessionStorage
  | PersistStorage
  | undefined
export const storageEngine: StorageEngine = {
  getItem: (key: any): any => {
    const rawData = localStorage.getItem(key)
    if (!rawData) return

    const data = JSON.parse(rawData) as StoreModelV1;
    data.events.event = null
    data.base.clickStrengthModifier = 1

    data.badges.badges = data.badges.badges.map((b, i) => {
      return { ...badges[i], ...b }
    })
   
    data.upgrades.upgrades = data.upgrades.upgrades.map((u,i)=>{
      delete (u  as Partial<IUpgrade>).levels;
      const upgrade: IUpgrade= {...upgrades[i],...u};
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
