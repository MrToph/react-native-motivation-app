import Immutable from 'seamless-immutable'
import { dayKeys } from '../../constants'

const defaultState = Immutable({
  scheduleIds: [1, 2],
  scheduleByIds: {
    1: {
      id: 1,
      enabled: true,
      time: {
        hour: (Date.now() + 15) % 12,
        minute: (Date.now() + 12) % 60,
      },
      doesRepeat: true,
      repeatMap: dayKeys.reduce(
                (obj, dayKey, i) => Object.assign(obj, { [dayKey]: i < 5 }),
                {},
            ),
    },
    2: {
      id: 2,
      enabled: false,
      time: {
        hour: Date.now() % 12,
        minute: Date.now() % 60,
      },
      doesRepeat: true,
      repeatMap: dayKeys.reduce(
                (obj, dayKey, i) => Object.assign(obj, { [dayKey]: !!(i % 2) }),
                {},
            ),
    },
  },
})

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'TIME_CHANGED': {
      const { id, hour, minute } = action.payload
      return state.merge({
        scheduleByIds: {
          [id]: {
            time: {
              hour,
              minute,
            },
          },
        },
      }, { deep: true })
    }
    default:
      return state
  }
}

export default reducer
