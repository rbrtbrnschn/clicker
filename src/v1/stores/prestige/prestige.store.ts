import { action, thunk } from "easy-peasy";
import { PrestigeModel } from "./prestige.model";

export const initialPrestigeData: PrestigeModel = {
  prestigeCount: 0,
  tokenCount: 0,
  setPrestigeCount: action((state,prestigeCount)=>{
    state.prestigeCount = prestigeCount;
  }),
  setTokenCount: action((state,tokenCount)=>{
    state.tokenCount= tokenCount;
  }),
  disptachPrestige: thunk((actions,_,helpers)=>{
    const addedTokens = helpers.getStoreState().v1.base.totalClicks / 1000;
    actions.setPrestigeCount(helpers.getState().prestigeCount + 1);
    actions.setTokenCount(helpers.getState().tokenCount + addedTokens);
    const storeActions = helpers.getStoreActions().v1;

    storeActions.base.reset();
    storeActions.events.reset();
    storeActions.perks.reset();
    storeActions.upgrades.reset();

  }),

  reset: thunk((actions,_,helpers)=>{
    actions.setPrestigeCount(0);
    actions.setTokenCount(0);
  })
}
