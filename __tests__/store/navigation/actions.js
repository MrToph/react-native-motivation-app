import configureMockStore from 'redux-mock-store'   // "The mock store will store the dispatched actions in an array to be used in your tests."
import thunk from 'redux-thunk'
import { loadStateAndSetAlarms } from '../../../src/store/navigation/actions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const mockStoreState = {
  settings: {
    wifiOnly: true,
    volume: 30,
  },
}

describe('async action loadStateAndSetAlarms', () => {
  it('should fire STATE_LOADED twice followed by APP_LAUNCHED', () => {
    const expectedActions = [
            { type: 'ALARM_STATE_LOADED' },
            { type: 'SETTINGS_STATE_LOADED' },
            { type: 'APP_LAUNCHED' },
    ]
    const store = mockStore(mockStoreState)
    return store.dispatch(loadStateAndSetAlarms('1'))
      .then(() => { // return of async actions
        expect(store.getActions()).toHaveLength(expectedActions.length)
        store.getActions().forEach((action, i) => expect(action.type).toBe(expectedActions[i].type))
      })
  })
})
