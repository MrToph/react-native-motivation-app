/* eslint-env browser */
/* global YT */
import playlist from './playlist.json'

function getAllUrlParams(url) { // from https://www.sitepoint.com/get-url-parameters-with-javascript/
  // get query string from url (optional) or window
  let queryString = url ? url.split('?')[1] : window.location.search.slice(1)
  // we'll store the parameters here
  const obj = {}
  // if query string exists
  if (queryString) {
    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0]
    // split our query string into its component parts
    const arr = queryString.split('&')
    for (let i = 0; i < arr.length; i += 1) {
      // separate the keys and the values
      const a = arr[i].split('=')
      // in case params look like: list[]=thing1&list[]=thing2
      let paramNum
      let paramName = a[0].replace(/\[\d*]/, (v) => {
        paramNum = v.slice(1, -1)
        return ''
      })
      // set parameter value (use 'true' if empty)
      const paramValue = typeof (a[1]) === 'undefined' ? true : a[1]
      // (optional) keep case consistent
      paramName = paramName.toLowerCase()
      // if parameter name already exists
      if (obj[paramName]) {
        // convert value to array (if still string)
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]]
        }
        // if no array index number specified...
        if (typeof paramNum === 'undefined') {
          // put the value on the end of the array
          obj[paramName].push(paramValue)
        } else { // if array index number specified...
          // put the value at that index number
          obj[paramName][paramNum] = paramValue
        }
      } else { // if param name doesn't exist yet, set it
        obj[paramName] = paramValue
      }
    }
  }
  return obj
}

function getDayOfYear() {   // http://stackoverflow.com/a/26426761
  const today = new Date()
  const year = today.getFullYear()
  // leap year if divisible by 4 and either (divisible by 400 or not divisible by 100)
  const isLeapYear = (year % 4) === 0 && ((year % 400) === 0 || (year % 100) !== 0)

  const dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
  const mn = today.getMonth()
  const dn = today.getDate()
  let dayOfYear = dayCount[mn] + dn
  if (mn > 1 && isLeapYear) dayOfYear += 1
  return dayOfYear - 1  // index at 0
}

const params = getAllUrlParams()
console.log(params)
function getVideoId() {
  if (params.videoid) return params.videoid

  const dayOfYear = getDayOfYear()
  const playlistLength = playlist.length
  return playlist[dayOfYear % playlistLength]
}
const videoId = getVideoId() || 'SuPLxQD4akQ' // default video if everything else fails

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.setPlaybackQuality('small')
  // volume between 0 and 100
  event.target.setVolume(params.volume ? parseInt(params.volume, 10) : 100)
  if (params.autoplay) event.target.playVideo()
}

// There are several issues with communication with react-native's webview and the YouTube-Iframe Api:
// The iFrame Api fires the error for a wrong video-id (number 2) twice.
// PostMessages do not arrive at react-native if sent immediately. Bad solution is to wait for some seconds
const errorTypeToTimeoutId = {}
function onPlayerError(event) {
  const errorType = event.data
  console.error('YouTube-Iframe-Api Error-Code:', errorType)
  // if current error was already queued, don't queue it again
  if (typeof errorTypeToTimeoutId[errorType] === 'number') return
  errorTypeToTimeoutId[errorType] = setTimeout(() => window.postMessage(errorType, '*'), 3000)
}

let player  // eslint-disable-line
window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    width: '100%',
    height: '100%',
    videoId,
    events: {
      onReady: onPlayerReady,
      onError: onPlayerError,
    },
    playerVars: { // https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
      rel: 0, // no related videos
      controls: 1,  // no controls
      showinfo: 0,  // no video title, uploader etc.
      loop: 1,  // loop the video
      /* Fixes loop bug in AS3-Player https://developers.google.com/youtube/player_parameters?#loop */
      playlist: videoId,
    },
  })
}

