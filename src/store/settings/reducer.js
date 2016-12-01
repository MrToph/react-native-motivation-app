import * as selectors from './selectors'

const defaultState = {
  playRandom: true,
  playCustomVideoId: 'hbkZrOU1Zag',
  wifiOnly: true,
  volume: 30,
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default reducer
