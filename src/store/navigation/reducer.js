import { NativeModules } from 'react-native'
import AppLauncher from 'react-native-app-launcher'
import Immutable from 'seamless-immutable'
import { getWifiOnly } from '../selectors'

const defaultState = Immutable({
  activeScene: 'alarm',
  video: {
    reload: false,  // when rendering Video component, should it reload or keep its old state
    autoplay: false,  // when rendering Video component, should it auto play?
  },
})

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'APP_LAUNCHED': {
      NativeModules.SoundManager.setControlStreamMusic()
      // if app was launched with an alarmId => show the video screen and autoplay video
      const { alarmId, connectionInfo } = action.payload
      if (typeof alarmId !== 'undefined') {
        const wifiOnly = getWifiOnly(action.getState())
        // if settings say play even if not on wifi
        // or we are connected to Wifi => play video
        if (!wifiOnly || connectionInfo === 'WIFI') {
          return state.merge({
            activeScene: 'video',
            video: {
              reload: true,
              autoplay: true,
            },
          }, { deep: true })
        }
        // otherwise play Sound
        NativeModules.SoundManager.playAlarmSound()
        setTimeout(() => NativeModules.SoundManager.stopAlarmSound(), 30000)
      }
      return state
    }
    case 'TAB_PRESSED': {
      return state.merge({
        activeScene: action.payload,
        video: {
          autoplay: false,  // if clicked manually, don't autoplay
        },
      }, { deep: true })
    }
    case 'SNOOZE_PRESSED': {
      return state.merge({
        activeScene: 'alarm',
      }, { deep: true })
    }
    case 'VIDEO_PLAYER_LOAD_END': {
      return state.merge({
        video: {
          reload: false,
        },
      }, { deep: true })
    }
    default:
      return state
  }
}

export default reducer
