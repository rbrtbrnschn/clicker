import { Action, Computed, Thunk } from "easy-peasy";
import { StoreModel } from "../../../store";
import { ClickHistory } from "./base.logic";
import { IClickHistory, SetIncDecDto, Verocity } from "./base.types";

export interface BaseModelV2 {
  /* Properties */
  count: number;
  clickStrengthBase: number;
  clickStrengthModifier:number;
  clickStrength: Computed<BaseModelV2, number>;
  clickHistory: ClickHistory[];
  verocity: Computed<BaseModelV2,Verocity>;

  /* Dispatches */
  click: Thunk<BaseModelV2, undefined, any, StoreModel>
  interval: Thunk<BaseModelV2, undefined, any, StoreModel>

  /* Services */
  setCount: Action<BaseModelV2, SetIncDecDto<number>>;
  setClickStrengthBase: Action<BaseModelV2, SetIncDecDto<number>>;
  setClickStrengthModifier: Action<BaseModelV2, SetIncDecDto<number>>;
  setClickHistory: Action<BaseModelV2, SetIncDecDto<IClickHistory | IClickHistory[] | undefined>>;
}
