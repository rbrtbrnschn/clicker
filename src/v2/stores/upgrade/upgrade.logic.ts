import { IUpgrade } from './upgrade.types'

export const findUpgradeByLabel = (label: string) => (upgrade: IUpgrade) =>
  upgrade.label.toLowerCase() === label.toLowerCase()
