const newReducers: { [key in string]?: ((state: any, action: any) => any)[] } = {}
const initReducerIds: Set<string> = new Set()

const createReducers = (reducers, reducerIds: string[], parentNames: string[] = []) => {
  const count = reducerIds.length
  for (let i = 0; i < count; i++) {
    const name = reducerIds[i]
    const reducer = reducers[name]
    if (typeof reducer === 'function') {
      const parentNamesLastIndex = parentNames.length - 1
      const lastName = parentNames[parentNamesLastIndex]

      const fn = (state, action) => {
        for (let i = 0; i < parentNamesLastIndex; i++) {
          const currentName = parentNames[i]
          if (!state[currentName]) state[currentName] = {}
          state = state[currentName]
        }
        const result = reducer(state[lastName], action)
        state[lastName] = result || typeof result === 'number' ? result : null
      }

      if (newReducers[name]) {
        newReducers[name].push(fn)
      } else {
        newReducers[name] = [fn]
      }
    } else {
      createReducers(reducer, Object.keys(reducer), [...parentNames, name])
    }
  }
}

export function combineReducers<T, O>(reducers: T, oldReducers: O) {
  const reducerIds = Object.keys(reducers).filter(item => {
    const hasNotItem = !initReducerIds.has(item)
    initReducerIds.add(item)
    return hasNotItem
  })
  createReducers(reducers, reducerIds)
  const oldReducersKeys = Object.keys(oldReducers)
  const oldReducersKeysCount = oldReducersKeys.length
  let hasInit = false
  return (state = {}, action: { type: string } & { [key in string]: any }) => {
    if (!hasInit && !!action.type.match(/^@@redux\/(INIT|REPLACE)/)) {
      hasInit = true
      action.type = '@@INIT'
    }
    let hasChanged = false
    const nextState = { ...state }

    for (let i = 0; i < oldReducersKeysCount; i++) {
      const key = oldReducersKeys[i]
      const reducer = oldReducers[key]
      const previousStateForKey = nextState[key]
      const nextStateForKey = reducer(previousStateForKey, action)
      nextState[key] = nextStateForKey
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }

    const actionFns = newReducers[action.type]
    if (actionFns) {
      const actionFnsCount = actionFns.length
      for (let i = 0; i < actionFnsCount; i++) {
        actionFns[i](nextState, action)
      }
      hasChanged = true
    }

    return hasChanged ? nextState : state
  }
}
