import { IClickHistory } from './base.types'

export class ClickHistory implements IClickHistory {
  created_at: number
  prior: number
  after: number
  cps: number
  clickStrength: number
  constructor({ clickStrength, cps, after, prior, created_at }: IClickHistory) {
    this.clickStrength = clickStrength 
    this.cps = cps
    this.after = after
    this.prior = prior
    this.created_at = created_at
  }
}
export class ClickHistoryBuilder {
  build({ clickStrength, cps, after, prior }: Omit<IClickHistory, 'created_at'>) {
    return new ClickHistory({
      prior,
      after,
      cps,
      clickStrength,
      created_at: new Date().getTime(),
    })
  }
}
