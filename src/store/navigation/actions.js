import { AsyncStorage, NetInfo } from 'react-native'
import { createAlarmStateLoad } from '../alarm/actions'
import { createSettingsStateLoad } from '../settings/actions'
import { getVolume, getWifiOnly } from '../selectors'

export function createTabPress(tabName) {
  return {
    type: 'TAB_PRESSED',
    payload: tabName,
  }
}

export function createVideoPlayerLoadEnd() {
  return {
    type: 'VIDEO_PLAYER_LOAD_END',
  }
}

export function createVideoPlayerError(error, wasAutoplay) {
  return {
    type: 'VIDEO_PLAYER_ERROR',
    payload: {
      error,
      wasAutoplay,
    },
  }
}

export function createLaunchAction(alarmId, connectionInfo, settingsWifiOnly, volume) {
  return {
    type: 'APP_LAUNCHED',
    payload: {
      alarmId,
      connectionInfo,
      wifiOnly: settingsWifiOnly,
      volume,
    },
  }
}

export function createOrientationChanged(orientation) {
  return {
    type: 'ORIENTATION_CHANGED',
    payload: {
      orientation,
    },
  }
}

export function createRingtoneModalDismissPressed() {
  return {
    type: 'RINGTONE_MODAL_DISMISSED',
  }
}

// not used right now
export function createStateLoadError(error) {
  return {
    type: 'STATE_LOAD_ERROR',
    payload: {
      error,
    },
  }
}


// THUNKS
function loadState(type) {
  // AsyncStorage.removeItem(type)
  return AsyncStorage.getItem(type)  // full app state for alarm, settings
}

export function loadStateAndSetAlarms(alarmId) {
  return function (dispatch, getState) {
    return loadState('alarm')
    .then(
      stateString => dispatch(createAlarmStateLoad(stateString)),
    ).then(
      () => loadState('settings'),
    )
    .then(
      stateString => dispatch(createSettingsStateLoad(stateString)),
    )
    .then(
        NetInfo.fetch,
    )
    .then(
      connectionInfo => dispatch(createLaunchAction(
        alarmId,
        connectionInfo,
        getWifiOnly(getState()),
        getVolume(getState()),
      )),
    )
  }
}
