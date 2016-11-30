import Immutable from 'seamless-immutable'
import AppLauncher from 'react-native-app-launcher'
import moment from 'moment'
import { dayKeys } from '../../constants'

console.log(AppLauncher)
/**
 * A schedule object is the visual representation of an alarm.
 */
const createScheduleObj = (id, enabled, doesRepeat, hour, minute) => ({
  id: 1,
  enabled: typeof enabled === 'undefined' ? true : enabled,
  time: {
    hour: hour || 15,
    minute: minute || 12,
  },
  doesRepeat: typeof doesRepeat === 'undefined' ? true : doesRepeat,
  repeatMap: dayKeys.reduce(
                (obj, dayKey, i) => Object.assign(obj, { [dayKey]: i > 0 && i < 6 }),
                {},
            ),
})

export const computeNextAlarmTimestamp = (hour, minute, doesRepeat, repeatMap) => {
  const bufferSeconds = 5  // to prevent double firing
  const now = moment()
  const fire = moment()
  fire.hour(hour)
  fire.minute(minute)
  fire.seconds(0)
  

  // no repeat => fire as soon as possible once
  if (!doesRepeat) {
    // either today or tomorrow depending on if current time is already over the specified hour:minute
    if (fire.diff(now, 'seconds') < bufferSeconds) fire.add(1, 'day')
    return fire
  }

  // is any repeat even checked?
  const someDayOnRepeat = Object.values(repeatMap).some(val => val)
  if (!someDayOnRepeat) return null

  const dayKeyIndex = now.day() // 0 .. 6 where 0 = Sunday
  // is it on repeat for today?
  if (repeatMap[dayKeys[dayKeyIndex]]) {
    // can we still fire today?
    if (!(fire.diff(now, 'seconds') < bufferSeconds)) return fire // fire for today is still in the future, return
  }

  // cannot fire today, find correct day of the week starting with tomorrow checking one full week inclusive
  // no % 7
  for (let offset = 1; offset <= 7; offset += 1) {
    if (repeatMap[dayKeys[(dayKeyIndex + offset) % 7]]) {
      fire.day(dayKeyIndex + offset, 'days')  // no % 7 because of the way moment.js works with last/next week
      return fire
    }
  }

  throw new Error('computeNextAlarmTimestamp: Unreachable code')
}

/**
 * Sets the alarm for the schdule provided as a parameter with Android's AlarmManager.
 * Returns a new alarmObj.
 */
const setAlarm = (scheduleObj) => {
  const { id, enabled, time, doesRepeat, repeatMap } = scheduleObj
  let timestamp = null  // timestamp when the alarm goes off next
  if (enabled) {
    const date = computeNextAlarmTimestamp(time.hour, time.minute, doesRepeat, repeatMap)
    if (date != null) {
      timestamp = date.valueOf()
      AppLauncher.setAlarm(id, timestamp)
    }
  }
  return {
    id,
    enabled,
    timestamp,
  }
}

const defaultState = Immutable({
  scheduleIds: [1, 2],
  schedulesById: {
    1: createScheduleObj(1),
    2: createScheduleObj(2, false, true, 8, 0),
  },
  alarmsById: {
    1: {
      id: 1,
      enabled: false,
      timestamp: null,
    },
    2: {
      id: 2,
      enabled: false,
      timestamp: null,
    },
  },
})

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'APP_LAUNCHED': {
      const { alarmId } = action.payload
      // create alarms
      const alarmsById = {}
      state.scheduleIds.forEach(
        (id) => {
          alarmsById[id] = setAlarm(state.schedulesById[id])
        },
      )
      return state.set('alarmsById', alarmsById)
    }
    case 'TIME_CHANGED': {
      const { id, hour, minute } = action.payload
      let mergedState = state.merge({
        schedulesById: {
          [id]: {
            time: {
              hour,
              minute,
            },
          },
        },
      }, { deep: true })
      mergedState = mergedState.merge({
        alarmsById: {
          [id]: setAlarm(mergedState.schedulesById[id]),
        },
      }, { deep: true })
      return mergedState
    }
    case 'TIME_NEW': {
      let scheduleIds = state.scheduleIds
      // if array is empty, pick 0, otherwise last element id + 1 (array is sorted)
      const nextId = scheduleIds.length === 0 ? 0 : scheduleIds[scheduleIds.length - 1] + 1
      scheduleIds = scheduleIds.concat(nextId)
      const obj = createScheduleObj(nextId)
      let mergedState = state.merge({
        scheduleIds,
        schedulesById: {
          [nextId]: obj,
        },
      }, { deep: true })
      mergedState = mergedState.merge({
        alarmsById: {
          [nextId]: setAlarm(mergedState.schedulesById[nextId]),
        },
      }, { deep: true })
      return mergedState
    }
    case 'TIME_DELETE': {
      const { id } = action.payload
      const scheduleIds = state.scheduleIds.filter(val => val !== id)
      // TODO: call clear alarm
      return state.merge({
        scheduleIds,
        schedulesById: {
          [id]: undefined,
        },
        alarmsById: {
          [id]: undefined,
        },
      }, { deep: true })
    }
    case 'ENABLED_PRESSED': {
      const { id } = action.payload
      const enabled = !state.schedulesById[id].enabled
      let mergedState = state.merge({
        schedulesById: {
          [id]: {
            enabled,
          },
        },
      }, { deep: true })
      mergedState = mergedState.merge({
        alarmsById: {
          [id]: setAlarm(mergedState.schedulesById[id]),
        },
      }, { deep: true })
      return mergedState
    }
    case 'REPEAT_PRESSED': {
      const { id } = action.payload
      const doesRepeat = !state.schedulesById[id].doesRepeat
      let mergedState = state.merge({
        schedulesById: {
          [id]: {
            doesRepeat,
          },
        },
      }, { deep: true })
      mergedState = mergedState.merge({
        alarmsById: {
          [id]: setAlarm(mergedState.schedulesById[id]),
        },
      }, { deep: true })
      return mergedState
    }
    case 'REPEAT_BUTTON_PRESSED': {
      const { id, dayKey } = action.payload
      const active = !state.schedulesById[id].repeatMap[dayKey]
      let mergedState = state.merge({
        schedulesById: {
          [id]: {
            repeatMap: {
              [dayKey]: active,
            },
          },
        },
      }, { deep: true })
      mergedState = mergedState.merge({
        alarmsById: {
          [id]: setAlarm(mergedState.schedulesById[id]),
        },
      }, { deep: true })
      return mergedState
    }
    default:
      return state
  }
}

export default reducer
