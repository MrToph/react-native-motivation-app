import { NativeModules } from 'react-native'
import AppLauncher from 'react-native-app-launcher'
import Orientation from 'react-native-orientation'
import { AdMobInterstitial } from 'react-native-admob'
import Immutable from 'seamless-immutable'
import { getWifiOnly } from '../selectors'
import { testDeviceId } from '../../constants'

// AdMobInterstitial.setTestDeviceID('EMULATOR')
AdMobInterstitial.setTestDeviceID(testDeviceId)

function requestInterstitial() {
  // AdMobInterstitial.addEventListener('interstitialDidLoad',
  //     () => console.log('interstitialDidLoad event'))
  // AdMobInterstitial.addEventListener('interstitialDidClose',
  //     () => console.log('interstitialDidClose event'))
  // AdMobInterstitial.addEventListener('interstitialDidFailToLoad',
  //     () => console.log('interstitialDidFailToLoad event'))
  // AdMobInterstitial.addEventListener('interstitialDidOpen',
  //     () => console.log('interstitialDidOpen event'))
  // AdMobInterstitial.addEventListener('interstitialWillLeaveApplication',
  //     () => console.log('interstitalWillLeaveApplication event'))

  AdMobInterstitial.requestAd((error) => {
    if (error) {
      console.log('AdMobInterstitial.requestAd: ', error)
      return
    }
    AdMobInterstitial.showAd(err => err && console.log(err))
  })
}

const defaultState = Immutable({
  activeScene: 'alarm',
  video: {
    reload: false,  // when rendering Video component, should it reload or keep its old state
    autoplay: false,  // when rendering Video component, should it auto play?
  },
  orientation: 'PORTRAIT',  // or LANDSCAPE
})

Orientation.lockToPortrait()
const lockOrientationForScene = (newScene) => {
  console.log(newScene)
  if (newScene === 'video') {
    Orientation.unlockAllOrientations()
  } else {
    Orientation.lockToPortrait()
  }
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ORIENTATION_CHANGED': {
      return state.merge({
        orientation: action.payload.orientation,
      }, { deep: true })
    }
    case 'APP_LAUNCHED': {
      NativeModules.SoundManager.setControlStreamMusic()
      // if app was launched with an alarmId => show the video screen and autoplay video
      const { alarmId, connectionInfo } = action.payload
      if (typeof alarmId !== 'undefined') {
        const wifiOnly = getWifiOnly(action.getState())
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
        // otherwise play Sound
        NativeModules.SoundManager.playAlarmSound()
        setTimeout(() => NativeModules.SoundManager.stopAlarmSound(), 30000)
      }
      return state
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
    case 'SNOOZE_PRESSED': {
      lockOrientationForScene('alarm')
      requestInterstitial()
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
    case 'VIDEO_PLAYER_ERROR': {

    }
    default:
      return state
  }
}

export default reducer
