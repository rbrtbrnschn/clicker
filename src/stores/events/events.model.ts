import { Action, Helpers, Thunk } from "easy-peasy";
import { StoreModel } from "..";

export interface IEvent {
  label: string;
  duration: number;
  callback: (tbd:Helpers<EventsModel, StoreModel, any>) => void;
  cleanup: (tbd:Helpers<EventsModel, StoreModel, any>) => void;
  unlocked: boolean;
}
export interface EventsModel {
  events:Map<string, IEvent>,
  event: IEvent | null,
  setEvent: Action<EventsModel, IEvent | null>,
  dispatchEvent: Thunk<EventsModel, string | null,any, StoreModel>,
  dispatchRandomEvent: Thunk<EventsModel, undefined,any, StoreModel>

  reset: Action<EventsModel>
}

