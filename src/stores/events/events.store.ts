import { action, createContextStore, createTypedHooks, thunk } from 'easy-peasy'
import { EventsModel } from './events.model'
import { events } from './events'

export const initialEventsData: EventsModel = {
  event: null,
  events,
  setEvent: action((state,event)=>{
    state.event = event || null;
  }),
  dispatchEvent: thunk((state, label, helpers ) => {
    const noEventGiven = !label
    const eventNotNull = label !== null

    if (noEventGiven && eventNotNull) return
    const events = Array.from(helpers.getState().events.values());
    const event = events.find((e)=>e.label === label);
    if(!event) return;

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

    state.dispatchEvent(event.label || null)
  }),

  reset: action((state)=>{
    state.event = null;
    // TODO redundant
    state.events = events;
  })
}
export const EventsStore = createContextStore(initialEventsData)
export const {
  useStoreActions: useEventsActions,
  useStoreState: useEventsState,
  useStoreDispatch: useEventsDispatch,
  useStore,
} = createTypedHooks<EventsModel>()
