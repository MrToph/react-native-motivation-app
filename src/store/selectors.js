/**
 * Accumulates all the different selectors
 */
import * as navigationSelectors from './navigation/selectors'

const selectors = {}
Object.keys(navigationSelectors).forEach(
    funcName => selectors[funcName] = state => navigationSelectors[funcName](state.navigation) 
)

// We want to be able to import like this "import { name1, name2 } from 'selectors'"
// Below code behaves like "export {...selectors}" because of this relationship:
// var module = {}
// var exports = module.exports = {}
module.exports = selectors
