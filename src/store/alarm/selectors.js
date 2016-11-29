import { formatTime } from '../../utils'

export function getSchedules(state) {
  const schedules = []
  const scheduleIds = state.scheduleIds
  scheduleIds.forEach(
        (id) => {
          const { enabled, time, doesRepeat, repeatMap } = state.scheduleByIds[id]
          const retObj = {
            id,
            enabled,
            time: formatTime(time),
            doesRepeat,
            activeDayMap: repeatMap,
          }
          schedules.push(retObj)
        },
    )
  return schedules
}
