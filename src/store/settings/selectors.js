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
