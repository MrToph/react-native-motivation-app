import Immutable from 'seamless-immutable'

const defaultState = Immutable({
  activeScene: 'alarm',
})

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'TAB_PRESS': {
      return state.merge({
        activeScene: action.payload,
      }, { deep: true })
    }
    default:
      return state
  }
}

export default reducer
