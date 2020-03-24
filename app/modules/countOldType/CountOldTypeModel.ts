import { Reducer } from 'redux'
import { CountOldTypeConstants } from './CountOldTypeConstants'

export namespace CountOldTypeModel {
  export interface PayloadObjects {
    [CountOldTypeConstants.INCREMENT]: {
      count: number
    }
    [CountOldTypeConstants.DECREMENT]: {
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

  export type Reducers = { [key in keyof State]: Reducer<State[key]> }
}
