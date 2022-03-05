import { Thunk } from "easy-peasy";
import { StoreModel } from "..";

export interface UtilsModel {
  reset: Thunk<UtilsModel, undefined,any, StoreModel>;
}
