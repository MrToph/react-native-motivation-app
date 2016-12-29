import secretConstant from '../../secrets'

export function getSettingsState(state) {
  const { playRandom, playCustomVideoId, wifiOnly, volume, snoozeMinutes } = state
  return {
    playCustom: !playRandom,
    playCustomVideoId,
    wifiOnly,
    volume,
    snoozeMinutes,
  }
}

export function getSnoozeMinutes(state) {
  return state.snoozeMinutes
}

export function getWifiOnly(state) {
  return state.wifiOnly
}

export function getVolume(state) {
  return state.volume
}

export function getFreeVersion(state) {
  return state.freeVersion !== secretConstant
}

