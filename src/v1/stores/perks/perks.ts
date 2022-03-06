import { IPerk, PerkCategoryName } from './perks.model'


const basic: IPerk[] = [
  {
    label: 'My First Perk',
    cps: 0.1,
    cost: 10,
    category: 'basic',
    owned: 0,
    unlocked: true,
    costIncrease: 1.1,
  },
  {
    label: 'My Second Perk',
    cps: 0.2,
    cost: 25,
    category: 'basic',
    owned: 0,
    unlocked: true,
    costIncrease: 1.2,
  },
  {
    label: 'My Third Perk',
    cps: 0.5,
    cost: 50,
    category: 'basic',
    owned: 0,
    unlocked: true,
    costIncrease: 1.3,
  },
]
const advanced: IPerk[] = [
  {
    label: 'My First Other Perk',
    cps: 10,
    cost: 1000,
    category: 'advanced',
    owned: 0,
    unlocked: false,
    costIncrease: 1.5,
  },
]
const awesome: IPerk[] = []



export const perks: Record<PerkCategoryName, IPerk[]> = {
  basic,
  advanced,
  awesome
}

export const getInitialPerks = () => {
  return JSON.parse(JSON.stringify({...perks}));
}
