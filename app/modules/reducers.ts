import { countOldTypeReducer } from './countOldType/countOldTypeReducer'
import { countNewTypeReducer } from './countNewType/countNewTypeReducer'

export const rootReducers = {
  countOldType: countOldTypeReducer,
}

export const newRootReducers = {
  countNewType: countNewTypeReducer,
}
