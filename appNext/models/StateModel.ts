import { CountNewTypeModel } from '@appNext/modules/countNewType/CountNewTypeModel'

export namespace StateModel {
  export type Reducer<State, Action> = (state: State, action: Action) => State

  export type ReducerV2<State, PayloadObjects> = {
    [reducerKey in keyof PayloadObjects]?: Reducer<State, PayloadObjects[reducerKey]>
  } & {
    ['@@INIT']: Reducer<
      State,
      {
        type: '@@INIT'
      }
    >
  }

  export interface State {
    countNewType: CountNewTypeModel.State
  }
}
