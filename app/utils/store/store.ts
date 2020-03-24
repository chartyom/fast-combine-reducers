import { createStore, Reducer, Store, AnyAction } from 'redux'
import { rootReducers, newRootReducers } from '@app/modules/reducers'
import { StateModel } from '@app/models'
import { useStore } from 'react-redux'
import { useMemo } from 'react'
import { combineReducers } from './combineReducers'

export type StoreModel<State, Reducers = Reducer> = Store<State, AnyAction> & {
  asyncReducers: AnyAction | {}
  asyncNewReducers: AnyAction | {}
  injectReducer: (key: keyof State, asyncReducer: Reducers) => void
  injectNewReducer: <K, T>(key: keyof State, asyncReducer: T) => void
}

const createReducer = (
  asyncNewReducers: {} | AnyAction = {},
  asyncReducers: {} | AnyAction = {},
  initReducers: {} | AnyAction = {}
) =>
  combineReducers(
    {
      ...newRootReducers,
      ...asyncNewReducers,
    },
    {
      ...initReducers,
      ...rootReducers,
      ...asyncReducers,
    }
  ) as Reducer

const createStoreHooks = function(
  store: StoreModel<StateModel.State, Reducer<any, AnyAction>>,
  initReducers: {} | AnyAction
) {
  store.asyncReducers = {}
  store.asyncNewReducers = {}

  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer
    store.replaceReducer(createReducer(store.asyncNewReducers, store.asyncReducers, initReducers))
  }
  store.injectNewReducer = (key, asyncNewReducer) => {
    store.asyncNewReducers[key] = asyncNewReducer
    store.replaceReducer(createReducer(store.asyncNewReducers, store.asyncReducers, initReducers))
  }
}

export const store = (() => {
  const initialData = (window['__INITIAL_DATA__'] || {}) as {}

  const enhancerReduxDevToolsExtension = () => {
    return typeof window === 'object' && window['__REDUX_DEVTOOLS_EXTENSION__']
      ? window['__REDUX_DEVTOOLS_EXTENSION__']()
      : f => f
  }

  const initReducers: AnyAction | {} = initialData
    ? Object.keys(initialData).reduce((acc, item) => {
        acc[item] = (state = {}) => state
        return acc
      }, {})
    : {}

  const store: StoreModel<StateModel.State> = createStore(
    createReducer({}, {}, initReducers),
    initialData || {},
    enhancerReduxDevToolsExtension()
  )
  createStoreHooks(store, initReducers)
  return store
})()

// async load reducers
export const useCustomReducer = (key: keyof StateModel.State, reducer: Reducer) => {
  const store = useStore() as StoreModel<StateModel.State>
  useMemo(() => {
    store.injectReducer(key, reducer)
  }, [store])
}

export const useCustomNewReducer = <K, T>(key: keyof StateModel.State, reducer: T) => {
  const store = useStore() as StoreModel<StateModel.State>
  useMemo(() => {
    store.injectNewReducer(key, reducer)
  }, [store])
}
