export function formatTime(timeObj) {
  const hour = timeObj.hour
  let minute = timeObj.minute
  minute = ('0' + minute).slice(-2)
  return `${hour}:${minute}`
}
