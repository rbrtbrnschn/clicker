import { Action, Computed, Thunk } from "easy-peasy";
import { StoreModel } from "../../../store";

enum PerkCategories {
  "basic",
  "advanced",
  "awesome"
}
export type PerkCategoryName = keyof typeof PerkCategories;

export interface IPerk {
  label: string;
  category: PerkCategoryName;
  cps: number;
  costIncrease: number;
  cost: number;
  owned:number;
  unlocked:boolean;
}
interface BuyDto {
  amount: number;
  label: string;
}
export interface PerksModel {
  perks: Record<PerkCategoryName,IPerk[]>;
  cps: Computed<PerksModel, number>;
  cpsModifier: number;
  setCpsModifier: Action<PerksModel,number>;
  buy: Thunk<PerksModel, BuyDto, any, StoreModel>;
  sell: Action<PerksModel, BuyDto>;
  unlock: Action<PerksModel, string>;

  reset: Action<PerksModel>;
}
