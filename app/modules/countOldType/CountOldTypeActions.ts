import { store } from '@app/utils/store/store'
import { CountOldTypeModel } from './CountOldTypeModel'
import { CountOldTypeConstants } from './CountOldTypeConstants'
const { INCREMENT, DECREMENT } = CountOldTypeConstants

export namespace CountOldTypeActions {
  export const increment = () => {
    store.dispatch<CountOldTypeModel.Action>({
      type: INCREMENT,
      count: 1,
    })
  }

  export const decrement = () => {
    store.dispatch<CountOldTypeModel.Action>({
      type: DECREMENT,
      count: 1,
    })
  }
}
