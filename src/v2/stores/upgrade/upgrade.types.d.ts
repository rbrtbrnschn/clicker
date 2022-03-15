import { Helpers } from "easy-peasy";
import { StoreModel } from "../../../store";
import { SetIncDecDto } from "../base/base.types";
import { UpgradeModelV2 } from "./upgrade.model";

export interface IUpgrade {
  label: string;
  description: string;
  category: string;
  cost: number;
  isBought: boolean;
  callback: (helpers: Helpers<UpgradeModelV2, StoreModel, any> ) => void;
}

