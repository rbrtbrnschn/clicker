import { Action, Computed, Thunk} from "easy-peasy";
import { StoreModel } from "..";

interface IClick {
  clickStrength: number;
  prior: number;
  after: number;
  created_at: Date | number;
}
export interface BaseModel {
  clicks: number;
  clickStrengthBase: number;
  clickStrengthModifier: number;
  clickStrength: Computed<BaseModel, number>;

  history: IClick[]
  totalClicks: Computed<BaseModel,number>;

  increase: Action<BaseModel,number>;
  decrease: Action<BaseModel,number>;
  set: Action<BaseModel,number>;
  click: Action<BaseModel>;
  setClickStrengthModifier: Action<BaseModel, number>;
  setClickStrengthBase: Action<BaseModel, number>;
  interval: Thunk<BaseModel, undefined, any, StoreModel>;

  increaseClickStrengthBase: Action<BaseModel, number>;

  reset: Action<BaseModel>;

}
