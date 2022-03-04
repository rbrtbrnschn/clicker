import { BadgesModel } from './badges.model'
import { badges } from './badges'
import { action, unstable_effectOn } from 'easy-peasy'
import { toast } from 'react-toastify'
export const initialBadgesData: BadgesModel = {
  badges,
  completeBadge: action((state, label) => {
    const badge = state.badges.find((badge) => badge.label === label)
    if (!badge) return
    badge.achieved = true
  }),
  onAchieved: unstable_effectOn(
    [(state) => state.badges],
    (actions, change, helpers) => {
      const [curr] = change.current
      const [prev] = change.prev
      const diff = curr.filter((b) => !prev.includes(b))
      const achievedBadge = diff[0]
      if (!achievedBadge) return

      toast.success(`Earned ${achievedBadge.label} badge.`)
      return undefined
    }
  ),
}
