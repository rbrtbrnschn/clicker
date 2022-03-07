export interface IClickHistory {
  prior: number;
  after: number;
  created_at: number;
  clickStrength: number;
  cps: number;
}

export enum SetIncDec {
  SET,
  INCREASE,
  DECREASE,
} 
export interface SetIncDecDto<T> {
  type: SetIncDec,
  payload: T;
}
export enum Verocity {
  INACTIVE,
  LOW,
  MODERATE,
  HIGH,
  CRAZY
}
