import { getSnoozeMinutes, getFreeVersion } from '../selectors'

export function createTimeChanged(id, hour, minute) {
  return {
    type: 'TIME_CHANGED',
    payload: {
      id, hour, minute,
    },
  }
}

export function createTimeNew() {
  return {
    type: 'TIME_NEW',
  }
}

export function createTimeDelete(id) {
  return {
    type: 'TIME_DELETE',
    payload: {
      id,
    },
  }
}

export function createSnoozePressed() {
  return function (dispatch, getState) {
    return dispatch({
      type: 'SNOOZE_PRESSED',
      payload: {
        snoozeMinutes: getSnoozeMinutes(getState()),
        freeVersion: getFreeVersion(getState()),
      },
    })
  }
}

export function createSnoozeDelete() {
  return {
    type: 'SNOOZE_DELETE',
  }
}

export function createTimeEnabledPressed(id) {
  return {
    type: 'ENABLED_PRESSED',
    payload: {
      id,
    },
  }
}

export function createTimeRepeatPressed(id) {
  return {
    type: 'REPEAT_PRESSED',
    payload: {
      id,
    },
  }
}

export function createTimeRepeatButtonPressed(id, dayKey) {
  return {
    type: 'REPEAT_BUTTON_PRESSED',
    payload: {
      id,
      dayKey,
    },
  }
}

export function createAlarmStateLoad(stateString) {
  return {
    type: 'ALARM_STATE_LOADED',
    payload: {
      stateString,
    },
  }
}
