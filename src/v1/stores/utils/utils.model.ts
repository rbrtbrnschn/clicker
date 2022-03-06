import { Thunk } from "easy-peasy";
import { StoreModel } from "../../../store";

export interface UtilsModel {
  reset: Thunk<UtilsModel, undefined,any, StoreModel>;
}
