import { action, computed, thunk } from 'easy-peasy'
import { configV2 } from '../../config'
import { ClickHistory, ClickHistoryBuilder } from './base.logic'
import { BaseModelV2 } from './base.model'
import { SetIncDec, Verocity } from './base.types.d'
export const initialBaseV2Model: BaseModelV2 = {
  /* Properties */
  count: configV2.base.count,
  clickStrengthBase: configV2.base.clickStrengthBase,
  clickStrengthModifier: 1,
  clickStrength: computed(
    ({ clickStrengthBase, clickStrengthModifier }) =>
      clickStrengthBase * clickStrengthModifier
  ),
  clickHistory: [],
  verocity: computed(
    [
      (state) =>
        state.clickHistory.slice(-26).filter((c) => {
          const createdAt = c.created_at
          const THREE_SECONDS = 1000 * 3
          const fiveSecondsAgo = Date.now() - THREE_SECONDS
          return createdAt > fiveSecondsAgo
        }),
    ],
    (history) => {
      if (history.length <= 1) return Verocity.INACTIVE
      else if (history.length <= 10) return Verocity.LOW
      else if (history.length <= 20) return Verocity.MODERATE
      else if (history.length <= 25) return Verocity.HIGH
      else return Verocity.CRAZY
    }
  ),

  /* Dispatches */
  click: thunk((actions, _, helpers) => {
    const state = helpers.getState()
    const clickStrength = state.clickStrength
    const { count: prior } = state
    actions.setCount({ type: SetIncDec.INCREASE, payload: clickStrength })

    const { count: after } = state
    // TODO
    const cps = 0

    const clickHistory = new ClickHistoryBuilder().build({
      cps,
      after,
      prior,
      clickStrength,
    })
    actions.setClickHistory({ type: SetIncDec.INCREASE, payload: clickHistory })
  }),
  interval: thunk((actions, _, helpers) => {
    setInterval(() => {
      // TODO
      //const cps = helpers.getStoreState().v2;
      const cps = 0
      actions.setCount({ type: SetIncDec.INCREASE, payload: cps })
    }, 1000)
  }),

  /* Services */
  setCount: action((state, { type, payload }) => {
    if (type === SetIncDec.SET) state.count = payload
    else if (type === SetIncDec.INCREASE) state.count += payload
    else if (type === SetIncDec.DECREASE) state.count -= payload
  }),
  setClickStrengthBase: action((state, { type, payload }) => {
    if (type === SetIncDec.SET) state.clickStrengthBase = payload
    else if (type === SetIncDec.INCREASE) state.clickStrengthBase += payload
    else if (type === SetIncDec.DECREASE) state.clickStrengthBase -= payload
  }),
  setClickStrengthModifier: action((state, { type, payload }) => {
    if (type === SetIncDec.SET) state.clickStrengthModifier = payload
    else if (type === SetIncDec.INCREASE) state.clickStrengthModifier += payload
    else if (type === SetIncDec.DECREASE) state.clickStrengthModifier -= payload
  }),
  setClickHistory: action((state, { type, payload }) => {
    if (type === SetIncDec.SET) {
      const isArray = payload instanceof Array
      if (!isArray) return
      state.clickHistory = payload
    } else if (type === SetIncDec.INCREASE) {
      if (!payload) return
      const isArray = payload instanceof Array

      if (isArray) return
      state.clickHistory.push(payload)
    } else if (type === SetIncDec.DECREASE) state.clickHistory.pop()
  }),
}
