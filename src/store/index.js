import { applyMiddleware, createStore, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import alarmReducer from './alarm/reducer'
import navigationReducer from './navigation/reducer'
import settingsReducer from './settings/reducer'
import { devSettings } from '../constants'

const middleWares = []
middleWares.push(thunk)
if (devSettings.logRedux) {
  middleWares.push(logger())
}

const reducers = combineReducers({
  navigation: navigationReducer,
  settings: settingsReducer,
  alarm: alarmReducer,
})
const store = createStore(reducers, undefined, applyMiddleware(...middleWares))

export default store
