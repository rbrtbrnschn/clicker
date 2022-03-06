import { Action, Thunk } from "easy-peasy";
import { StoreModel } from "../../../store";

export interface PrestigeModel {
  tokenCount: number;
  prestigeCount: number;
  setTokenCount: Action<PrestigeModel, number>;
  setPrestigeCount: Action<PrestigeModel, number>;
  disptachPrestige: Thunk<PrestigeModel, undefined, any, StoreModel>;
  reset: Thunk<PrestigeModel,undefined, any, StoreModel>;
}
