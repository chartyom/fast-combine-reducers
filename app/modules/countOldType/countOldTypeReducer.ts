import { combineReducers } from 'redux'
import { CountOldTypeConstants } from './CountOldTypeConstants'
import { CountOldTypeModel } from './CountOldTypeModel'
import { StateModel } from '@app/models'
const { DECREMENT, INCREMENT } = CountOldTypeConstants

const count: StateModel.Reducer<CountOldTypeModel.CountState, CountOldTypeModel.Action> = (state = 0, action) => {
  switch (action.type) {
    case DECREMENT:
      return state - action.count
    case INCREMENT:
      return state + action.count
    default:
      return state
  }
}

const reducers: CountOldTypeModel.Reducers = {
  count,
}

export const countOldTypeReducer = combineReducers(reducers)
