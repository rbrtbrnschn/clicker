import { useEffect } from 'react'
import { useStoreActions, useStoreState } from '../store'
import './App.v2.css'
import { Verocity } from './stores/base/base.types.d'
import { upgrades } from './stores/upgrade/upgrades'

export const AppV2 = () => {
  const actions = useStoreActions((state) => state.v2)
  const state = useStoreState((state) => state.v2)
  const baseState = state.base
  const baseActions = actions.base
  const autoclickerState = state.autoclicker
  const autoclickerActions = actions.autoclicker
  const upgradeState = state.upgrade
  const upgradeActions = actions.upgrade

  const f = (num: number) => num.toFixed(2)

  useEffect(() => {
    const interval = setInterval(() => {
      autoclickerActions.dispatchUseCps()
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='container is-fluid'>
      <h1 className='title'>App V2</h1>
      <span className='subtitle'>Base</span>
      <div>
        <strong>Count:</strong> ${f(baseState.count)}
      </div>
      <div>
        <strong>ClickStrength:</strong> {f(baseState.clickStrength)}
      </div>
      <div>
        <strong>ClickStrengthBase:</strong> {f(baseState.clickStrengthBase)}
      </div>
      <div>
        <strong>ClickStrengthModifier:</strong>{' '}
        {f(baseState.clickStrengthModifier)}
      </div>
      <div>
        <strong>Verocity:</strong>{' '}
        {baseState.verocity === Verocity.INACTIVE
          ? 'inactive'
          : baseState.verocity === Verocity.LOW
          ? 'low'
          : baseState.verocity === Verocity.MODERATE
          ? 'moderate'
          : baseState.verocity === Verocity.HIGH
          ? 'high'
          : 'crazy'}
      </div>
      <button
        className={`verocity button is-rounded ${
          baseState.verocity === Verocity.INACTIVE
            ? '--inactive'
            : baseState.verocity === Verocity.LOW
            ? '--low'
            : baseState.verocity === Verocity.MODERATE
            ? '--moderate'
            : baseState.verocity === Verocity.HIGH
            ? '--high'
            : '--crazy'
        }`}
        onClick={() => {
          baseActions.click()
        }}
      >
        +
      </button>
      <hr />
      <span className='subtitle'> AutoClicker</span>
      <span>
        <strong>CPS:</strong>
        {f(autoclickerState.cps)}
      </span>
      {autoclickerState.autoclickers.map((clicker) => {
        const cost10 = autoclickerActions.getCosts({
          amount: 10,
          payload: clicker,
        }).total
        const canBuy10 = baseState.count >= cost10
        const canBuy1 = baseState.count >= clicker.cost
        return (
          <div style={{ display: 'flex', gap: '.3rem', alignItems: 'center' }}>
            <span>
              <strong>Label:</strong> {clicker.label}
            </span>
            <span>
              <strong>Owned:</strong> {clicker.owned}{' '}
            </span>
            <button
              className='button is-rounded is-primary'
              disabled={!canBuy1}
              onClick={() => {
                autoclickerActions.dispatchPurchase({
                  label: clicker.label,
                  amount: 1,
                })
              }}
            >
              +1 - {f(clicker.cost)}
            </button>
            <button
              className={`button is-rounded is-primary`}
              disabled={!canBuy10}
              onClick={() => {
                autoclickerActions.dispatchPurchase({
                  amount: 10,
                  label: clicker.label,
                })
              }}
            >
              +10 - {f(cost10)}
            </button>
          </div>
        )
      })}

      <hr />
      <div className='subtitle'>Upgrades</div>
      {upgradeState.upgrades.map((upgrade, i) => {
        if(upgrade.isBought) return <></>
        return (
          <div>
            <strong>Name: </strong>{upgrade.label} <span><strong>Cost </strong>${upgrade.cost}</span>{' '}
            <button className='button is-primary is-rounded' disabled={upgrade.isBought} onClick={() => {
              upgradeActions.dispatchPurchase(upgrade.label);
            }}>Buy</button>
          </div>
        )
      })}
    </div>
  )
}
