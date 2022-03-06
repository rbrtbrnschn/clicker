import { IEvent } from "./events.model";

export const events = new Map<string, IEvent>();

const myEvents: IEvent[] = [
  {
    label: "Mating Season",
    duration: 15000,
    cleanup: (helpers) => {
      helpers.getStoreActions().v1.base.setClickStrengthModifier(1);
    },
    callback: (helpers) => {
      helpers.getStoreActions().v1.base.setClickStrengthModifier(2);
    },
    unlocked: true,
  },
  {

    label: "Mating Season V2",
    duration: 15000,
    cleanup: (helpers) => {
      helpers.getStoreActions().v1.base.setClickStrengthModifier(1);
    },
    callback: (helpers) => {
      helpers.getStoreActions().v1.base.setClickStrengthModifier(3);
    },
    unlocked: false,
  }
]


myEvents.forEach((e)=>events.set(e.label,e));
