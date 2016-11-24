import * as selectors from './selectors'

const defaultState = {
    playRandom: true,
    playYoutubeVideoID: 'hbkZrOU1Zag',
    wifiOnly: true,
}

const reducer = (state = defaultState, action) => {
    switch(action.type) {
        default:
            return state
    }
}

export default reducer
