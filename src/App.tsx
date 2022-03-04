import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import './App.css'
import { useStoreState,useStoreActions } from './stores'
import { BaseStore } from './stores/base/base.store'
import { EventsStore } from './stores/events'
import { PerksStore } from './stores/perks/perks.store'

function App() {
  const baseState = useStoreState((state)=>state.base);
  const eventsState = useStoreState((state)=>state.events);
  const perksState = useStoreState((state)=>state.perks);
  const baseActions = useStoreActions((state)=> state.base)
  const eventsActions = useStoreActions((state)=> state.events);
  const perksActions = useStoreActions((state)=>state.perks);

  const clicks = baseState.clicks;
  const clickStrength = baseState.clickStrength;
  const events = eventsState.events;
  const event = eventsState.event;
  const cps = perksState.cps;
  const clickHistory = baseState.history;
  const categories = Array.from(perksState.perks.keys());

  const dispatchCpsHook = baseActions.interval;
  const buyPerk = perksActions.buy;
  const dispatchClick = baseActions.click;
  const dispatchRandomEvent = eventsActions.dispatchRandomEvent;

  const perks = Array.from(perksState.perks.values()).flatMap((e)=>e).filter((e)=>e.unlocked);
  useEffect(()=>{
    dispatchCpsHook();
    console.info("dispatched autoclickers")
  },[])
  return (
    <div className='App'>
      <ToastContainer position='top-right' pauseOnHover={true} draggable={true}/>
      Clicks: {clicks.toFixed(2)} <br /> Cps: {cps.toFixed(2)}
      <br />
      <span> click strength: {clickStrength.toFixed(2)}</span>
      <br/>
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
        <button onClick={()=>{
        buyPerk({label:"My First Perk", amount: 10});
      }}>Buy Perk</button>
      <div style={{}}>
{perks.map((p,i)=><div key={i}> 
          <span>Name: {p.label}</span><br/>
          <span>Cost: {p.cost}</span><br/>
          <span>Cps: {p.cps}</span><br/>
          <span>Owned: {p.owned}</span><br/>

        </div>)}
    </div>
        
      <div style={{ display: 'none' }}>
        {clickHistory.map((e,i) => (
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
