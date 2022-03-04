import { Action, Computed } from "easy-peasy";

enum PerkCategories {
  "basic",
  "advanced",
  "awesome"
}
export type PerkCategoryName = keyof typeof PerkCategories;

export interface ICategory {
  label: PerkCategoryName;
}
export interface IPerk {
  label: string;
  category: PerkCategoryName;
  cps: number;
  cost: number;
  owned:number;
  unlocked:boolean;
}
interface BuyDto {
  amount: number;
  label: string;
}
export interface PerksModel {
  perks: Map<ICategory,IPerk[]>;
  cps: Computed<PerksModel, number>;
  buy: Action<PerksModel, BuyDto>;
  sell: Action<PerksModel, BuyDto>;
  unlock: Action<PerksModel, string>;
}
