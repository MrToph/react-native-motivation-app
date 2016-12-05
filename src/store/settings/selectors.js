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
