import { CountNewTypeConstants } from './CountNewTypeConstants'
import { StateModel } from '@app/models'

export namespace CountNewTypeModel {
  export interface PayloadObjects {
    [CountNewTypeConstants.INCREMENT]: {
      count: number
    }
    [CountNewTypeConstants.DECREMENT]: {
      count: number
    }
  }

  export type PayloadObjectId = keyof PayloadObjects
  export type Payload<T extends PayloadObjectId = PayloadObjectId> = PayloadObjects[T]

  export type Action<T extends PayloadObjectId = PayloadObjectId> = Payload<T> & {
    type: T
  }

  export type CountState = number

  export interface State {
    count: CountState
  }
  export type Reducer<S> = StateModel.ReducerV2<S, PayloadObjects>
  export type Reducers = { [key in keyof State]: Reducer<State[key]> }
}
