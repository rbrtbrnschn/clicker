import { IPerk, ICategory } from './perks.model'

export const perks = new Map<ICategory, IPerk[]>()

const myBasicPerks: IPerk[] = [
  {
    label: 'My First Perk',
    cps: 0.1,
    cost: 10,
    category: 'basic',
    owned: 0,
    unlocked: true,
  },
  {
    label: 'My Second Perk',
    cps: 0.1,
    cost: 10,
    category: 'basic',
    owned: 0,
    unlocked: true,
  },
  {
    label: 'My Third Perk',
    cps: 0.1,
    cost: 10,
    category: 'basic',
    owned: 0,
    unlocked: true,
  },
]
const myAdvancedPerks: IPerk[] = [
  {
    label: 'My First Other Perk',
    cps: 0.1,
    cost: 10,
    category: 'advanced',
    owned: 0,
    unlocked: false,
  },
]
const myAwesomePerks: IPerk[] = []

perks.set({ label: 'basic' }, myBasicPerks)
perks.set({ label: 'advanced' }, myAdvancedPerks)
perks.set({ label: 'awesome' }, myAwesomePerks)
