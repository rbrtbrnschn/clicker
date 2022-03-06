import { Action, Helpers, Thunk } from "easy-peasy";
import { StoreModel } from "../../../store";

export interface ILevel {
  cost: number;
  description: string;
  callback: (helpers: Helpers<UpgradesModel, StoreModel, any>) => void;
}
export interface IUpgrade {
  label: string;
  category: string;
  cost:number;
  level: number;
  isMaxed: boolean;
  levels: ILevel[];

}
export interface UpgradesModel {
  upgrades: IUpgrade[];
  upgrade: Action<UpgradesModel,string>;
  dispatchUpgrade: Thunk<UpgradesModel, string,any, StoreModel>;

  reset: Action<UpgradesModel>;
}
