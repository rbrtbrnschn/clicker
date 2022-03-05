import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import { useStoreState, useStoreActions } from './stores'
import { BaseStore } from './stores/base/base.store'
import { EventsStore } from './stores/events'
import { IEvent } from './stores/events/events.model'
import { PerksStore } from './stores/perks/perks.store'
import { useStoreRehydrated } from 'easy-peasy'

function App() {
  const isRehydrated = useStoreRehydrated()

  const baseState = useStoreState((state) => state.base)
  const eventsState = useStoreState((state) => state.events)
  const perksState = useStoreState((state) => state.perks)
  const upgradesState = useStoreState((state) => state.upgrades)
  const baseActions = useStoreActions((state) => state.base)
  const eventsActions = useStoreActions((state) => state.events)
  const perksActions = useStoreActions((state) => state.perks)
  const upgradesActions = useStoreActions((state) => state.upgrades)
  const utilsActions = useStoreActions((state)=>state.utils);

  const clicks = baseState.clicks
  const clickStrength = baseState.clickStrength
  const events = eventsState.events
  const event = eventsState.event
  const cps = perksState.cps
  const clickHistory = baseState.history
  const upgrades = upgradesState.upgrades

  const dispatchCpsHook = baseActions.interval
  const buyPerk = perksActions.buy
  const dispatchClick = baseActions.click
  const dispatchRandomEvent = eventsActions.dispatchRandomEvent
  const dispatchEvent = eventsActions.dispatchEvent
  const dispatchGlobalReset = utilsActions.reset;

  const perks = Object.values(perksState.perks)
    .flatMap((e) => e)
    .filter((e) => e.unlocked)
  useEffect(() => {
    dispatchCpsHook()
    console.info('dispatched autoclickers')
  }, [])
  if (!isRehydrated) return <div>Loading...</div>

  return (
    <div className='App'>
      <ToastContainer
        position='top-right'
        pauseOnHover={true}
        draggable={true}
      />
      <h1>Easy Peasy Clicker</h1>
      Clicks: {clicks.toFixed(5)} <br /> Cps: {cps.toFixed(2)}
      <br />
      <span> click strength: {clickStrength.toFixed(2)}</span>
      <br />
      <span>Total Clicks: {clickHistory.length}</span>
      <button onClick={()=>{dispatchGlobalReset()}}>Reset</button>
        <h3> Current Event: {event?.label || 'none'}</h3>
      <h3>Events</h3>
      {Array.from(events.values()).map((e, i) => (
        <div key={i}>
          <span>Label: {e.label}</span>
          <span>Duration: {e.duration}</span>
          <button
            onClick={() => {
              dispatchEvent(e.label)
            }}
          >
            Dispatch
          </button>
        </div>
      ))}
      <button onClick={() => dispatchClick()}>Inc</button>
      <button
        onClick={() => {
          dispatchRandomEvent()
        }}
      >
        Dispatch Event
      </button>
      <button
        onClick={() => {
          buyPerk({ label: 'My First Perk', amount: 10 })
        }}
      >
        Buy Perk
      </button>
      <div style={{}}>
        <h2> Perks</h2>
        {perks.map((p, i) => (
          <div
            key={i}
            style={{ display: 'flex', gap: '.5rem', justifyContent: 'center' }}
          >
            <span>Name: {p.label}</span>
            <span>Cost: {p.cost}</span>
            <span>Cps: {p.cps}</span>
            <span>Owned: {p.owned}</span>
            <button
              onClick={() => {
                buyPerk({ label: p.label, amount: 1 })
              }}
            >
              Purchase
            </button>
          </div>
        ))}
      </div>
      <div>
        <h2> Upgrades</h2>
        <div>
          {upgrades.map((u, i) => (
            <div key={i}>
              <strong> {u.label} </strong>
              <span> cost: {u.levels[u.level]?.cost || 0}</span>
              <span> description: {u.levels[u.level]?.description || ""}</span>
              <span> lvl: {u.level}</span>
              <span> maxed: {u.isMaxed ? 'yes' : 'no'}</span>
              <button
                onClick={() => {
                  upgradesActions.dispatchUpgrade(u.label)
                }}
              >
                {' '}
                Upgrade
              </button>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'none' }}>
        <h2> Cick History </h2>
        {clickHistory.map((e, i) => (
          <div key={i}>
            <span>Created: {e.created_at.toLocaleString()}</span>
            <br />
            <span>Prior: {e.prior.toFixed(2)}</span>
            <br />
            <span>After: {e.after.toFixed(2)}</span>
            <br />
            <span>Curr clickStrength: {e.clickStrength.toFixed(2)}</span>
            <br />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
