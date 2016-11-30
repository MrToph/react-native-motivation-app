import moment from 'moment'
import MockDate from 'mockdate'
import { dayKeys } from '../../../src/constants'
import { computeNextAlarmTimestamp } from '../../../src/store/alarm/reducer'

// Fake new Date() / moment() to use a hardcoded time
const reference = moment('2016-11-15 12:00')    // Tuesday
MockDate.set(reference.valueOf()) // 2016-11-15
console.log(moment().format())

// http://momentjs.com/docs/#/get-set/day/
it('moment.js weekday set in future', () => {
  const nextWednesday = moment('2016-11-15')
  nextWednesday.day(3)
  // 1 would then be yesterday 11-14
  const nextMonday = moment('2016-11-15')
  nextMonday.day(8)
  expect(nextWednesday.valueOf()).toBe(moment('2016-11-16').valueOf())
  expect(nextMonday.valueOf()).toBe(moment('2016-11-21').valueOf())
})

it('computeNextAlarmTimestamp no repeat same day later', () => {
  const schedule = moment()
  schedule.add(1, 'minute')
  const answer = computeNextAlarmTimestamp(schedule.hour(), schedule.minute(), false)
  expect(answer.format('YYYY-MM-DD HH:mm')).toBe(schedule.format('YYYY-MM-DD HH:mm'))
})

it('computeNextAlarmTimestamp no repeat same day earlier', () => {
  const schedule = moment()
  schedule.add(-1, 'minute')
  const answer = computeNextAlarmTimestamp(schedule.hour(), schedule.minute(), false)
  expect(answer.format('YYYY-MM-DD HH:mm')).toBe('2016-11-16 11:59')    // the next day
})

it('computeNextAlarmTimestamp repeat empty repeatMap', () => {
  const schedule = moment()
  schedule.add(-1, 'minute')
  const repeatMap = dayKeys.reduce(
                        (obj, dayKey) => Object.assign(obj, { [dayKey]: false }),
                        {},
                    )
  const answer = computeNextAlarmTimestamp(schedule.hour(), schedule.minute(), true, repeatMap)
  expect(answer).toBe(null)    // the next day
})

it('computeNextAlarmTimestamp repeat same day later', () => {
  const schedule = moment()
  schedule.add(1, 'minute')
  const repeatMap = dayKeys.reduce(
                        (obj, dayKey, i) => Object.assign(obj, { [dayKey]: i === 2 }),
                        {},
                    )
  const answer = computeNextAlarmTimestamp(schedule.hour(), schedule.minute(), true, repeatMap)
  expect(answer.format('YYYY-MM-DD HH:mm')).toBe('2016-11-15 12:01')
})

it('computeNextAlarmTimestamp repeat same day earlier next week', () => {
  const schedule = moment()
  schedule.add(-1, 'minute')
  const repeatMap = dayKeys.reduce(
                        (obj, dayKey, i) => Object.assign(obj, { [dayKey]: i === 2 }),
                        {},
                    )
  const answer = computeNextAlarmTimestamp(schedule.hour(), schedule.minute(), true, repeatMap)
  expect(answer.format('YYYY-MM-DD HH:mm')).toBe('2016-11-22 11:59')    // the next week
})

it('computeNextAlarmTimestamp repeat other day first', () => {
  const schedule = moment()
  const repeatMap = dayKeys.reduce(
                        (obj, dayKey, i) => Object.assign(obj, { [dayKey]: i !== 2 }),
                        {},
                    )
  const answer = computeNextAlarmTimestamp(schedule.hour(), schedule.minute(), true, repeatMap)
  expect(answer.format('YYYY-MM-DD HH:mm')).toBe('2016-11-16 12:00')    // Wednesday this week
})

it('computeNextAlarmTimestamp repeat Monday next week', () => {
  const schedule = moment()
  const repeatMap = dayKeys.reduce(
                        (obj, dayKey, i) => Object.assign(obj, { [dayKey]: i === 1 }),
                        {},
                    )
  const answer = computeNextAlarmTimestamp(schedule.hour(), schedule.minute(), true, repeatMap)
  expect(answer.format('YYYY-MM-DD HH:mm')).toBe('2016-11-21 12:00')    // next week Monday
})

// resetting resets it too early and we use the current date in some tests instead of mock date
// MockDate.reset()
