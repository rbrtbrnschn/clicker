import { SetIncDec } from '../base/base.types'

export interface IAutoClicker {
  /**
   * Name of the auto clicker
   */
  label: string
  /**
   * category name to order
   */
  category: string
  /**
   * increase in cps
   */
  cps: number
  /**
   * cps increase modifier on purchase - default: 1;
   */
  cpsIncrease: number
  /**
   * cost per purchase
   */
  cost: number
  /**
   * cost increase modifier on purchase - default: 1;
   */
  costIncrease: number
  /**
   * times bought
   */
  owned: number
  /**
   * unlocked or not
   */
  unlocked: boolean
  /**
   * order number used for sorting algs; High = end; Low = start;
   */
  order: number
}

export interface PurchaseDto {
  label: string
  amount: number
}

export interface SetDto {
  type: SetIncDec
  amount: number
  payload: IAutoClicker
}
export interface IGetCosts {
  total: number
  next: number
}
export interface ICalcNextTotal {
  amount: number
  cost: number
  increase: number
}
