import { IPerk, PerkCategoryName } from './perks.model'


const basic: IPerk[] = [
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
const advanced: IPerk[] = [
  {
    label: 'My First Other Perk',
    cps: 0.1,
    cost: 10,
    category: 'advanced',
    owned: 0,
    unlocked: false,
  },
]
const awesome: IPerk[] = []


export const perks: Record<PerkCategoryName, IPerk[]> = {
  basic,
  advanced,
  awesome
}
