export function formatTime(timeObj) {
  const hour = timeObj.hour
  let minute = timeObj.minute
  minute = (`0${minute}`).slice(-2)
  return `${hour}:${minute}`
}

export function padLeft(char, totalLength, valueToPad) {
  const textToPad = valueToPad.toString()
  return char.repeat(Math.max(totalLength - textToPad.length, 0)) + textToPad
}

export function isInt(value) {
  if (isNaN(value)) {
    return false
  }
  const x = parseFloat(value)
  return Math.trunc(x) === x
}

export function isFloat(value) {
  if (isNaN(value)) {
    return false
  }
  return true
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}
