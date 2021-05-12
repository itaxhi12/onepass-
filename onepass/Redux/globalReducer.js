import {combineReducers ,createStore} from 'redux'
import {reducer} from './auth'
const reducers = combineReducers({reducer})

export const store = createStore(reducers)