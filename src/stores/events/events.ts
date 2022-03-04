import { IEvent } from "./events.model";

export const events = new Map<string, IEvent>();

const myEvents: IEvent[] = [
  {
    label: "Mating Season",
    duration: 15000,
    cleanup: (helpers) => {
      helpers.getStoreActions().base.setClickStrengthModifier(1);
    },
    callback: (helpers) => {
      helpers.getStoreActions().base.setClickStrengthModifier(2);
    }
  },
  {

    label: "Mating Season V2",
    duration: 15000,
    cleanup: (helpers) => {
      helpers.getStoreActions().base.setClickStrengthModifier(1);
    },
    callback: (helpers) => {
      helpers.getStoreActions().base.setClickStrengthModifier(3);
    }
  }
]


myEvents.forEach((e)=>events.set(e.label,e));
