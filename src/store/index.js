import { applyMiddleware, createStore, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import settingsReducer from './settings/reducer'
import alarmReducer from './alarm/reducer'
import { devSettings } from '../constants'

function getStateMiddleWare ({ getState }) {
  return (next) => (action) => {
    return next({ ...action, getState: getState })
  }
}

var store
var middleWares = []
middleWares.push(thunk)
middleWares.push(getStateMiddleWare)
if (devSettings.logRedux) {
  middleWares.push(logger())
}

const reducers = combineReducers({
//   navigation: reducer,
  settings: settingsReducer,
  alarm: alarmReducer
})
store = createStore(reducers, undefined, applyMiddleware(...middleWares))

export default store
