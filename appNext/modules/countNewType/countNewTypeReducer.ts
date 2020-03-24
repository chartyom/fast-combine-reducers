import { CountNewTypeConstants } from './CountNewTypeConstants'
import { CountNewTypeModel } from './CountNewTypeModel'
const { DECREMENT, INCREMENT } = CountNewTypeConstants

const count: CountNewTypeModel.Reducer<CountNewTypeModel.State['count']> = {
  [DECREMENT]: (state, action) => {
    return state - action.count
  },
  [INCREMENT]: (state, action) => {
    return state + action.count
  },
  ['@@INIT']: (state = 0) => state,
}

export const countNewTypeReducer: CountNewTypeModel.Reducers = {
  count,
}
