import { action, createContextStore, createTypedHooks, thunk } from 'easy-peasy'
import { EventsModel } from './events.model'
import { events } from './events'

export const initialEventsData: EventsModel = {
  event: null,
  events,
  setEvent: action((state,event)=>{
    state.event = event || null;
  }),
  dispatchEvent: thunk((state, event, helpers ) => {
    const noEventGiven = !event
    const eventNotNull = event !== null

    if (noEventGiven && eventNotNull) return
    state.setEvent(event);
    if (!eventNotNull) return

    event.callback(helpers)
    setTimeout(() => {
      event.cleanup(helpers)
      state.setEvent(null)
    }, event.duration)
  }),
  dispatchRandomEvent: thunk((state, _, helpers) => {
    const storeState = helpers.getStoreState()
    const events = Array.from(storeState.events.events.values())
    const randomIndex = Math.floor(events.length * Math.random())
    const event = events[randomIndex]

    state.dispatchEvent(event || null)
  }),
}
export const EventsStore = createContextStore(initialEventsData)
export const {
  useStoreActions: useEventsActions,
  useStoreState: useEventsState,
  useStoreDispatch: useEventsDispatch,
  useStore,
} = createTypedHooks<EventsModel>()
