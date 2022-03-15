import { persist } from "easy-peasy";
import { AutoClickerV2Model } from "./autoclicker/autoclicker.model";
import { initialAutoClickerV2Model } from "./autoclicker/autoclicker.store";
import { BaseModelV2 } from "./base/base.model";
import { initialBaseV2Model } from "./base/base.store";
import { UpgradeModelV2 } from "./upgrade/upgrade.model";
import { initialUpgradeV2Data } from "./upgrade/upgrade.store";

export interface StoreModelV2 {
  base: BaseModelV2;
  autoclicker: AutoClickerV2Model;
  upgrade: UpgradeModelV2;
}

export const initialStoreV2Data : StoreModelV2 = {
  base: initialBaseV2Model, 
  autoclicker: initialAutoClickerV2Model,
  upgrade: initialUpgradeV2Data 
}
export const modelV2 = persist(initialStoreV2Data);
