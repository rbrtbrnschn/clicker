import { BaseModelV2 } from "./base/base.model";

export interface StoreModelV2 {
  base: BaseModelV2;
}

export const initialStoreV2Data : StoreModelV2 = {
  base: {
    count: 69, 
  }
}
