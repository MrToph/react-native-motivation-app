const defaultState = {
  activeScene: 'alarm',
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'TAB_PRESS': {
      return { ...state, activeScene: action.payload }
    }
    default:
      return state
  }
}

export default reducer
