import React, { Component, PropTypes } from 'react'
import { AppRegistry } from 'react-native'
import { hookConsoleLog } from 'stacklogger'
import { Provider } from 'react-redux'
import store from './src/store'
import { loadStateAndSetAlarms } from './src/store/navigation/actions'
import App from './src/scenes/App'

hookConsoleLog()

export default class Motivation extends Component {
  static propTypes = {
    // if app is launched from an AlarmManager through react-native-app-launcher, the id of the alarm responsible
    // for the launch is injected as a prop
    alarmID: PropTypes.string,
  }
  constructor(props) {
    super(props)
    // console.log('index.android.js', props)
  }

  componentWillMount() {
    store.dispatch(loadStateAndSetAlarms(this.props.alarmID))
  }

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('Motivation', () => Motivation)
