import { BadgesModel } from './badges.model'
import { badges } from './badges'
import { action, actionOn, thunkOn, unstable_effectOn } from 'easy-peasy'
import { toast } from 'react-toastify'
export const initialBadgesData: BadgesModel = {
  badges,
  completeBadge: action((state, label) => {
    const badge = state.badges.find((badge) => badge.label === label)
    if (!badge) return console.log('couldnt find badge')
    badge.achieved = true
    console.log('completed badged')
  }),
  onCompleteBadge: thunkOn(
    (actions) => actions.completeBadge,
    (state, payload, helpers) => {
      toast.success(`Earned ${payload.payload} badge.`)
    }
  ),
}
