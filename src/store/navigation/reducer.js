import Immutable from 'seamless-immutable'

const defaultState = Immutable({
  activeScene: 'alarm',
})

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'APP_LAUNCHED': {
      const { alarmId } = action.payload
      if (alarmId) {
        return state.merge({
          activeScene: 'video',
        }, { deep: true })
      }
      return state
    }
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
