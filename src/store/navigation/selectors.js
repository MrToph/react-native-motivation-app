export function getActiveScene(state) {
  return state.activeScene
}

export function isOrientationLandscape(state) {
  return state.orientation === 'LANDSCAPE'
}

export function getRingtoneModalVisible(state) {
  return state.ringtoneModal.visible
}
