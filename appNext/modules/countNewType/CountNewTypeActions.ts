import { store } from '@appNext/utils/store/store'
import { CountNewTypeModel } from './CountNewTypeModel'
import { CountNewTypeConstants } from './CountNewTypeConstants'
const { INCREMENT, DECREMENT } = CountNewTypeConstants

export namespace CountNewTypeActions {
  export const increment = () => {
    store.dispatch<CountNewTypeModel.Action>({
      type: INCREMENT,
      count: 1,
    })
  }

  export const decrement = () => {
    store.dispatch<CountNewTypeModel.Action>({
      type: DECREMENT,
      count: 1,
    })
  }
}
