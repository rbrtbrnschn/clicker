import { SetIncDec } from '../base/base.types.d'
import { IUpgrade } from './upgrade.types'

export const upgrades: IUpgrade[] = [
  {
    cost: 10,
    description: '',
    isBought: false,
    label: 'Gentle Touch',
    category: 'my category',
    callback: (helpers) => {
      helpers
        .getStoreActions()
        .v2.base.setClickStrengthBase({
          type: SetIncDec.INCREASE,
          payload: 0.1,
        })
    },
  },
{
    cost: 100,
    description: '',
    isBought: false,
    label: 'Hand Of Doom',
    category: 'my category',
    callback: (helpers) => {
      helpers
        .getStoreActions()
        .v2.base.setClickStrengthBase({
          type: SetIncDec.INCREASE,
          payload: 0.2,
        })
    },
  },

]
