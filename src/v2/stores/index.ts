import { AutoClickerV2Model } from "./autoclicker/autoclicker.model";
import { initialAutoClickerV2Model } from "./autoclicker/autoclicker.store";
import { BaseModelV2 } from "./base/base.model";
import { initialBaseV2Model } from "./base/base.store";

export interface StoreModelV2 {
  base: BaseModelV2;
  autoclicker: AutoClickerV2Model;
}

export const initialStoreV2Data : StoreModelV2 = {
  base: initialBaseV2Model, 
  autoclicker: initialAutoClickerV2Model,
}
