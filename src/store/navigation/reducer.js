import { NativeModules } from 'react-native'
import AppLauncher from 'react-native-app-launcher'
import Orientation from 'react-native-orientation'
import { AdMobInterstitial } from 'react-native-admob'
import Immutable from 'seamless-immutable'
// import { testDeviceId } from '../../constants'

const defaultState = Immutable({
  activeScene: 'alarm',
  video: {
    reload: false,  // when rendering Video component, should it reload or keep its old state
    autoplay: false,  // when rendering Video component, should it auto play?
  },
  ringtoneModal: {
    visible: false,
  },
  orientation: 'PORTRAIT',  // or LANDSCAPE
})

// AdMobInterstitial.setTestDeviceID('EMULATOR')
// AdMobInterstitial.setTestDeviceID(testDeviceId)
const requestInterstitial = () => {
  AdMobInterstitial.requestAd((error) => {
    if (error) {
      console.log('AdMobInterstitial.requestAd: ', error)
      return
    }
    AdMobInterstitial.showAd(err => err && console.log(err))
  })
}

Orientation.lockToPortrait()
const lockOrientationForScene = (newScene) => {
  if (newScene === 'video') {
    Orientation.unlockAllOrientations()
  } else {
    Orientation.lockToPortrait()
  }
}

const playAlarmSound = (state) => {
  NativeModules.SoundManager.playAlarmSound()
  return state.merge({
    ringtoneModal: {
      visible: true,
    },
  }, { deep: true })
}

const stopAlarmSound = () => {
  NativeModules.SoundManager.stopAlarmSound()
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'APP_LAUNCHED': {
      NativeModules.SoundManager.setControlStreamMusic()
      // if app was launched with an alarmId => show the video screen and autoplay video
      const { alarmId, connectionInfo, wifiOnly, volume } = action.payload
      if (typeof alarmId !== 'undefined') {
        // if settings say play even if not on wifi
        // or we are connected to Wifi => play video
        if (!wifiOnly || connectionInfo === 'WIFI') {
          lockOrientationForScene('video')
          return state.merge({
            activeScene: 'video',
            video: {
              reload: true,
              autoplay: true,
            },
          }, { deep: true })
        }
        // otherwise (no WiFi and settings say only when WiFi) play Sound
        NativeModules.SoundManager.setMusicVolume(volume)
        return playAlarmSound(state)
      }
      return state
    }
    case 'ORIENTATION_CHANGED': {
      return state.merge({
        orientation: action.payload.orientation,
      }, { deep: true })
    }
    case 'TAB_PRESSED': {
      lockOrientationForScene(action.payload)
      return state.merge({
        activeScene: action.payload,
        video: {
          autoplay: false,  // if clicked manually, don't autoplay
        },
      }, { deep: true })
    }
    case 'RINGTONE_MODAL_DISMISSED': {
      stopAlarmSound()
      return state.merge({
        activeScene: 'alarm',
        ringtoneModal: {
          visible: false,
        },
      }, { deep: true })
    }
    case 'SNOOZE_PRESSED': {
      const { freeVersion } = action.payload
      stopAlarmSound()
      lockOrientationForScene('alarm')
      if (freeVersion) requestInterstitial()
      return state.merge({
        activeScene: 'alarm',
        ringtoneModal: {
          visible: false,
        },
      }, { deep: true })
    }
    case 'VIDEO_PLAYER_LOAD_END': {
      return state.merge({
        video: {
          reload: false,
        },
      }, { deep: true })
    }
    case 'VIDEO_PLAYER_ERROR': {
      // if autoplay is true, it means video playing was triggered through an alarm
      const { wasAutoplay } = action.payload
      let mergedState = state
      if (wasAutoplay) {
        mergedState = playAlarmSound(mergedState)
      }
      return mergedState.merge({
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
