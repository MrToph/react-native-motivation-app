export function createTabPress(tabName) {
  return {
    type: 'TAB_PRESS',
    payload: tabName,
  }
}

export function createVideoPlayerLoadEnd() {
  return {
    type: 'VIDEO_PLAYER_LOAD_END',
  }
}
