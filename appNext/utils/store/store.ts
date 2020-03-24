import { createStore, Reducer, Store, AnyAction } from 'redux'
import { reducers } from '@appNext/modules/reducers'
import { StateModel } from '@appNext/models'
import { useStore } from 'react-redux'
import { useMemo } from 'react'
import { combineReducers } from './combineReducers'

export type StoreModel<State, Reducers = Reducer> = Store<State, AnyAction> & {
  asyncReducers: AnyAction | {}
  injectReducer: <K, T>(key: keyof State, asyncReducer: T) => void
}

const createReducer = (asyncReducers: {} | AnyAction = {}, initReducers: {} | AnyAction = {}) =>
  combineReducers({
    ...reducers,
    ...asyncReducers,
  }) as Reducer

const createStoreHooks = function(store: StoreModel<StateModel.State, Reducer<any, AnyAction>>) {
  store.asyncReducers = {}

  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer
    store.replaceReducer(createReducer(store.asyncReducers))
  }
}

export const store = (() => {
  const initialData = (window['__INITIAL_DATA__'] || {}) as {}

  const enhancerReduxDevToolsExtension = () => {
    return typeof window === 'object' && window['__REDUX_DEVTOOLS_EXTENSION__']
      ? window['__REDUX_DEVTOOLS_EXTENSION__']()
      : f => f
  }

  const store: StoreModel<StateModel.State> = createStore(
    createReducer({}),
    initialData || {},
    enhancerReduxDevToolsExtension()
  )
  createStoreHooks(store)
  return store
})()

// async load reducers
export const useCustomReducer = <K, T>(key: keyof StateModel.State, reducer: T) => {
  const store = useStore() as StoreModel<StateModel.State>
  useMemo(() => {
    store.injectReducer(key, reducer)
  }, [store])
}
