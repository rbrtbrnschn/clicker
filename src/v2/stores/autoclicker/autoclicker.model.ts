import { Action, Computed, Thunk } from "easy-peasy";
import { StoreModel } from "../../../store";
import { IAutoClicker, IGetCosts, PurchaseDto, SetDto } from "./autoclicker.types";

export interface AutoClickerV2Model {
  /* Properties */
  autoclickers: IAutoClicker[];
  cps: Computed<AutoClickerV2Model, number, StoreModel>
  
  /* Dispatches */
  dispatchPurchase: Thunk<AutoClickerV2Model, PurchaseDto, any, StoreModel>;
  dispatchUseCps: Thunk<AutoClickerV2Model, undefined, any, StoreModel>;

  /* Services */
  setOwned: Action<AutoClickerV2Model, SetDto>;
  setCosts: Action<AutoClickerV2Model, SetDto>;
  setCps: Action<AutoClickerV2Model, SetDto>;
  unlock: Action<AutoClickerV2Model, IAutoClicker>

  getCosts: Thunk<AutoClickerV2Model, Omit<SetDto,"type">, any, StoreModel, IGetCosts>;
}
