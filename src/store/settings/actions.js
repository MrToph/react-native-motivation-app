export function createWiFiOnlyPressed() {
  return {
    type: 'SETTINGS_WIFI_ONLY_PRESSED',
  }
}

export function createCustomVideoPressed() {
  return {
    type: 'SETTINGS_CUSTOM_VIDEO_PRESSED',
  }
}

export function createSnoozeTimeChanged(snoozeMinutes) {
  return {
    type: 'SETTINGS_SNOOZE_TIME_CHANGED',
    payload: snoozeMinutes,
  }
}

export function createCustomVideoIdChanged(videoId) {
  return {
    type: 'SETTINGS_CUSTOM_VIDEO_ID_CHANGED',
    payload: videoId,
  }
}

export function createVolumeChanged(volume) {
  return {
    type: 'SETTINGS_VOLUME_CHANGED',
    payload: volume,
  }
}

export function createSettingsStateLoad(stateString) {
  return {
    type: 'SETTINGS_STATE_LOADED',
    payload: {
      stateString,
    },
  }
}

export function createNoAdsPurchased() {
  return {
    type: 'PURCHASED_NO_ADS',
  }
}
