import { combineReducers } from 'redux'
import weather from './weather'
// import auth from './auth'
import auth from '../ducks/auth'
import page from './page'

export const rootReducer = combineReducers({ page, weather, auth })
