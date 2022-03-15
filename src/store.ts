import { createStore, createTypedHooks, persist, PersistConfig } from 'easy-peasy'
import { initialStoreV1Data, modelV1, StoreModelV1 } from './v1/stores'
import { initialStoreV2Data, modelV2, StoreModelV2 } from './v2/stores'

export interface StoreModel {
  v1: StoreModelV1
  v2: StoreModelV2
}
const initialStoreState: StoreModel = {
  v1: modelV1,
  v2: initialStoreV2Data,
}

export const store = createStore(initialStoreState)

export const { useStoreActions, useStoreState, useStoreDispatch, useStore } =
  createTypedHooks<StoreModel>()
