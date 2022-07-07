import { combineReducers } from 'redux'
import { AppReducer } from './appReducer'
import { SearchReducer } from './searchrReducer'

export const rootReducer = combineReducers({
  app: AppReducer,
  search: SearchReducer,
})


