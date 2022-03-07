import { ICalcNextTotal } from './autoclicker.types'

/**
 * Calculates total on bulk purchase for amount x.
 */
export const calcTotal = ({
  cost,
  increase,
  amount,
}: ICalcNextTotal): number => {
  if (amount <= 1) return cost
  return (
    cost + calcTotal({ cost: cost * increase, increase, amount: amount - 1 })
  )
}
/**
 * Calculates next purchase total after bulk purchase for amount x.
 */
export const calcNext = ({
  cost,
  increase,
  amount,
}: ICalcNextTotal): number => {
  if (amount <= 0) return cost
  return calcNext({ cost: cost * increase, increase, amount: amount - 1 })
}
