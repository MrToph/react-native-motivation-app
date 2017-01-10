import Immutable from 'seamless-immutable'
import AppLauncher from 'react-native-app-launcher'
import moment from 'moment'
import { AsyncStorage } from 'react-native'
import { dayKeys } from '../../constants'

/**
 * Given a time (hour, minute) and some scheduling information (doesRepeat, repeatMap) computes the next
 * Date to fire an alarm
 */
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
  for (let offset = 1; offset <= 7; offset += 1) {
    if (repeatMap[dayKeys[(dayKeyIndex + offset) % 7]]) {
      fire.day(dayKeyIndex + offset, 'days')  // no % 7 because of the way moment.js works with last/next week
      return fire
    }
  }

  throw new Error('computeNextAlarmTimestamp: Unreachable code')
}

/**
 * Sets the alarm for the schedule provided as a parameter, with Android's AlarmManager.
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
  } else { // clear alarm
    AppLauncher.clearAlarm(id)
  }
  return {
    id,
    enabled,
    timestamp,
  }
}

/**
 * Sets the alarm for the snooze timer provided as a parameter, with Android's AlarmManager.
 * Returns a new alarmObj.
 */
export const setSnooze = (snoozeObj, timestamp) => {
  const { id, enabled } = snoozeObj
  if (enabled) {
    AppLauncher.setAlarm(id, timestamp)
  } else { // clear alarm
    AppLauncher.clearAlarm(id)
  }
  return {
    id,
    enabled,
    timestamp,
  }
}

/**
 * A schedule object is the visual representation of an alarm.
 */
export const createScheduleObj = (id, enabled, doesRepeat, hour, minute) => ({
  id,
  enabled: typeof enabled === 'undefined' ? true : enabled,
  time: {
    hour: hour || 7,
    minute: minute || 30,
  },
  doesRepeat: typeof doesRepeat === 'undefined' ? true : doesRepeat,
  repeatMap: dayKeys.reduce(
                (obj, dayKey, i) => Object.assign(obj, { [dayKey]: i > 0 && i < 6 }),
                {},
            ),
})

export const defaultState = Immutable({
  scheduleIds: [1, 2],
  schedulesById: {
    snooze: createScheduleObj('snooze', false, false),
    1: createScheduleObj(1),
    2: createScheduleObj(2, false, true, 8, 0),
  },
  alarmsById: {
    snooze: {
      id: 1,
      enabled: false,
      timestamp: null,
    },
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

const saveAndReturnState = (state) => {
  AsyncStorage.setItem('alarm', JSON.stringify(state.asMutable()))
  return state
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ALARM_STATE_LOADED': {
      const { stateString } = action.payload
      if (stateString == null) return saveAndReturnState(state)  // nothing stored => return default state
      try {
        const parsedState = JSON.parse(stateString)
        // corrupt state outside of our app, return
        if (typeof parsedState !== 'object') return saveAndReturnState(state)
        return Immutable(parsedState)
      } catch (err) {
        return state
      }
    }
    case 'APP_LAUNCHED': {
      let { alarmId } = action.payload
      if (!isNaN(alarmId)) alarmId = parseInt(alarmId, 10)

      // turn alarm with alarmId off if it was on no-repeat
      let newState = state
      if (state.schedulesById[alarmId] && !state.schedulesById[alarmId].doesRepeat) {
        newState = state.merge({
          schedulesById: {
            [alarmId]: {
              enabled: false,
            },
          },
        }, { deep: true })
      }

      // create alarms
      const alarmsById = {}
      newState.scheduleIds.forEach(
        (id) => {
          alarmsById[id] = setAlarm(newState.schedulesById[id])
        },
      )
      return saveAndReturnState(newState.set('alarmsById', alarmsById))
    }
    case 'SNOOZE_PRESSED': {
      const { snoozeMinutes } = action.payload
      const timestamp = moment()
      timestamp.add(snoozeMinutes, 'minutes')
      // create new _enabled_ snooze Object
      const snoozeObj = createScheduleObj('snooze', true, false)
      console.log('IUAWDHjiuawhdiuawhdiuawdhaiuwdh', snoozeObj.enabled)
      let mergedState = state.merge({
        schedulesById: {
          snooze: snoozeObj,
        },
      }, { deep: true })

      // update its alarm
      mergedState = mergedState.merge({
        alarmsById: {
          snooze: setSnooze(mergedState.schedulesById.snooze, timestamp.valueOf()),
        },
      }, { deep: true })
      return saveAndReturnState(mergedState)
    }
    case 'SNOOZE_DELETE': {
      const mergedState = state.merge({
        schedulesById: {
          snooze: {
            enabled: false,
          },
        },
        alarmsById: {
          snooze: {
            enabled: false,
          },
        },
      }, { deep: true })

      // clear alarm for snooze
      AppLauncher.clearAlarm('snooze')
      return saveAndReturnState(mergedState)
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
      return saveAndReturnState(mergedState)
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
      return saveAndReturnState(mergedState)
    }
    case 'TIME_DELETE': {
      const { id } = action.payload
      const scheduleIds = state.scheduleIds.filter(val => val !== id)
      const mergedState = state.merge({
        scheduleIds,
        schedulesById: {
          [id]: undefined,
        },
        alarmsById: {
          [id]: undefined,
        },
      }, { deep: true })

      // clear alarm for deleted id
      AppLauncher.clearAlarm(id)
      return saveAndReturnState(mergedState)
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
      return saveAndReturnState(mergedState)
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
      return saveAndReturnState(mergedState)
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
      return saveAndReturnState(mergedState)
    }
    default:
      return state
  }
}

export default reducer
