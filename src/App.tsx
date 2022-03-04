import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import { useStoreState, useStoreActions } from './stores'
import { BaseStore } from './stores/base/base.store'
import { EventsStore } from './stores/events'
import { PerksStore } from './stores/perks/perks.store'
import { upgrades } from './stores/upgrades/upgrades'

function App() {
  const baseState = useStoreState((state) => state.base)
  const eventsState = useStoreState((state) => state.events)
  const perksState = useStoreState((state) => state.perks)
  const upgradesState = useStoreState((state) => state.upgrades)
  const baseActions = useStoreActions((state) => state.base)
  const eventsActions = useStoreActions((state) => state.events)
  const perksActions = useStoreActions((state) => state.perks)
  const upgradesActions = useStoreActions((state) => state.upgrades)

  const clicks = baseState.clicks
  const clickStrength = baseState.clickStrength
  const events = eventsState.events
  const event = eventsState.event
  const cps = perksState.cps
  const clickHistory = baseState.history
  const categories = Array.from(perksState.perks.keys())

  const dispatchCpsHook = baseActions.interval
  const buyPerk = perksActions.buy
  const dispatchClick = baseActions.click
  const dispatchRandomEvent = eventsActions.dispatchRandomEvent

  const perks = Array.from(perksState.perks.values())
    .flatMap((e) => e)
    .filter((e) => e.unlocked)
  useEffect(() => {
    dispatchCpsHook()
    console.info('dispatched autoclickers')
  }, [])
  return (
    <div className='App'>
      <ToastContainer
        position='top-right'
        pauseOnHover={true}
        draggable={true}
      />
      Clicks: {clicks.toFixed(5)} <br /> Cps: {cps.toFixed(2)}
      <br />
      <span> click strength: {clickStrength.toFixed(2)}</span>
      <br />
      <span>Total Clicks: {clickHistory.length}</span>
      <div>
        <h3> Current Event: {event?.label || 'none'}</h3>
      </div>
      <h3>Events</h3>
      {Array.from(events.values()).map((e, i) => (
        <div key={i}>
          <span>Label: {e.label}</span>
          <br />
          <span>Duration: {e.duration}</span>
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
          <div key={i} style={{display: "flex", gap: ".5rem", justifyContent: "center"}}>
            <span>Name: {p.label}</span>
            <span>Cost: {p.cost}</span>
            <span>Cps: {p.cps}</span>
            <span>Owned: {p.owned}</span>
            <button onClick={() => {
              buyPerk({label: p.label, amount: 1});
            }}>Purchase</button>
          </div>
        ))}
      </div>

        <div>
        <h2> Upgrades</h2>
        <div>
{upgrades.map((u,i)=> <div key={i}>
            <strong> {u.label} </strong>
            <span> cost: {u.cost}</span>
            <span> lvl: {u.level}</span>
            <span> maxed: {u.isMaxed ? "yes" : "no"}</span>
            <button onClick={()=>{
              upgradesActions.upgrade(u.label);
            }}> Upgrade</button>
          </div>)}
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
