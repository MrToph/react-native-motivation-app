import Immutable from 'seamless-immutable'
import { AsyncStorage, NativeModules } from 'react-native'
import AppLauncher from 'react-native-app-launcher'
import secretConstant from '../../secrets'
import { clamp } from '../../utils'

export const defaultState = Immutable({
  playRandom: true,
  playCustomVideoId: 'hbkZrOU1Zag',
  wifiOnly: true,
  volume: 30,
  snoozeMinutes: 15,
  freeVersion: true,
})

const saveAndReturnState = (state) => {
  AsyncStorage.setItem('settings', JSON.stringify(state.asMutable()))
  return state
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SETTINGS_STATE_LOADED': {
      const { stateString } = action.payload
      if (stateString === null) return saveAndReturnState(state)  // nothing stored => return default state
      try {
        const parsedState = JSON.parse(stateString)
        // corrupt state outside of our app, return
        if (typeof parsedState !== 'object') return saveAndReturnState(state)
        return Immutable(parsedState)
      } catch (err) {
        return saveAndReturnState(state)
      }
    }
    case 'SETTINGS_WIFI_ONLY_PRESSED': {
      return saveAndReturnState(state.merge({
        wifiOnly: !state.wifiOnly,
      }, { deep: true }))
    }
    case 'SETTINGS_CUSTOM_VIDEO_PRESSED': {
      return saveAndReturnState(state.merge({
        playRandom: !state.playRandom,
      }, { deep: true }))
    }
    case 'SETTINGS_SNOOZE_TIME_CHANGED': {
      return saveAndReturnState(state.merge({
        snoozeMinutes: action.payload,
      }, { deep: true }))
    }
    case 'SETTINGS_CUSTOM_VIDEO_ID_CHANGED': {
      return saveAndReturnState(state.merge({
        playCustomVideoId: action.payload,
      }, { deep: true }))
    }
    case 'SETTINGS_VOLUME_CHANGED': {
      return saveAndReturnState(state.merge({
        volume: clamp(action.payload, 0, 100),
      }, { deep: true }))
    }
    case 'VIDEO_PLAYER_LOAD_END': {
      NativeModules.SoundManager.setMusicVolume(state.volume)
      return state
    }
    case 'PURCHASED_NO_ADS': {
      return saveAndReturnState(state.merge({
        freeVersion: secretConstant,
      }, { deep: true }))
    }
    default:
      return state
  }
}

export default reducer
