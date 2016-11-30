import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { TabBar } from '../components'
import { getActiveScene } from '../store/selectors'


class App extends Component {
  static propTypes = {
    activeScene: PropTypes.string.isRequired,
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TabBar activeScene={this.props.activeScene} />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  activeScene: getActiveScene(state),
})

export default connect(mapStateToProps)(App)
