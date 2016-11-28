import * as selectors from './selectors'

const defaultState = {
    activeScene: 'alarm'
}

const reducer = (state = defaultState, action) => {
    switch(action.type) {
        case 'TAB_PRESS': {
            return {...state, activeScene: action.payload}
            break
        }
        default:
            return state
    }
}

export default reducer
