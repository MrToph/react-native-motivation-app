export function createLaunchAction(alarmId) {
  return {
    type: 'APP_LAUNCHED',
    payload: {
      alarmId: parseInt(alarmId, 10),
    },
  }
}

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

