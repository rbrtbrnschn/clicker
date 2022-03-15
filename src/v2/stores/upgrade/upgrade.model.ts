import { Action, Thunk } from "easy-peasy";
import { StoreModel } from "../../../store";
import { IUpgrade} from "./upgrade.types";

export interface UpgradeModelV2 {
  /* Properties */
  upgrades: IUpgrade[];
  
  /* Dispatches */
  dispatchPurchase: Thunk<UpgradeModelV2, string, any, StoreModel>

  /* Services */
  toggleIsBought: Action<UpgradeModelV2, IUpgrade>;
  runCallback: Thunk<UpgradeModelV2, IUpgrade, any, StoreModel>;
  chargeUser: Thunk<UpgradeModelV2, IUpgrade, any, StoreModel>;
  hasFunds: Thunk<UpgradeModelV2,IUpgrade,any,StoreModel,boolean>
}
