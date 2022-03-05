import { Action, ActionOn, Helpers, ThunkOn, Unstable_EffectOn } from 'easy-peasy'
import { StoreModel } from '../'
import { BaseModel } from '../base/base.model'
import { EventsModel } from '../events/events.model';
import { PerksModel } from '../perks/perks.model';


type ModelKeys = keyof (BaseModel & EventsModel & PerksModel & BadgesModel);

export interface IBadge {
  label: string
  achieved: boolean
  //description: string;
  //icon: string;
  onAchieved: (tbd: Helpers<any, StoreModel, any>) => void
  condition: (tbd: Helpers<any, StoreModel, any>) => boolean
  dependency: ModelKeys[];
}
export interface BadgesModel {
  badges: IBadge[]
  completeBadge: Action<BadgesModel, string>
  onCompleteBadge: ThunkOn<BadgesModel,any,StoreModel>;
}
