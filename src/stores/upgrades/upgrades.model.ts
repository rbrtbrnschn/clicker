import { Action, Helpers, Thunk } from "easy-peasy";
import { StoreModel } from "..";
import { Upgrade } from "./upgrades";

export interface IUpgrade {
  label: string;
  category: string;
  cost:number;
  level: number;
  isMaxed: boolean;
  callback: ((helpers: Helpers<UpgradesModel, StoreModel, any>) => void)[];
  setCost: (newCost: number) => void;

}
export interface UpgradesModel {
  upgrades: Upgrade[];
  upgrade: Thunk<UpgradesModel, string,any, StoreModel>;
}
