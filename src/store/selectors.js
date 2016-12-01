/**
 * Accumulates all the different selectors
 */
import * as navigationSelectors from './navigation/selectors'
import * as alarmSelectors from './alarm/selectors'

const selectors = {}
Object.keys(navigationSelectors).forEach(
    funcName => selectors[funcName] = state => navigationSelectors[funcName](state.navigation),
)

Object.keys(alarmSelectors).forEach(
    funcName => selectors[funcName] = state => alarmSelectors[funcName](state.alarm),
)

selectors.getVideoState = function getVideoState(state) {
  return {
    isVideoActive: state.navigation.activeScene === 'video',
    autoplay: state.navigation.video.autoplay,
    reload: state.navigation.video.reload,
    volume: state.settings.volume,
    playRandom: state.settings.volume,
    playCustomVideoId: state.settings.playCustomVideoId,
  }
}

// We want to be able to import like this "import { name1, name2 } from 'selectors'"
// Below code behaves like "export {...selectors}" because of this relationship:
// var module = {}
// var exports = module.exports = {}
module.exports = selectors
