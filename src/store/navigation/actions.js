import { AsyncStorage, NetInfo } from 'react-native'
import { createAlarmStateLoad } from '../alarm/actions'
import { createSettingsStateLoad } from '../settings/actions'

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

export function createLaunchAction(alarmId, connectionInfo) {
  return {
    type: 'APP_LAUNCHED',
    payload: {
      alarmId,
      connectionInfo,
    },
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
  return function (dispatch) {
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
      connectionInfo => dispatch(createLaunchAction(alarmId, connectionInfo)),
    )
    .done()
  }
}
