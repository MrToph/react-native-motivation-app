import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { TabBar } from '../components'
import Video from './Video'
import { connect } from 'react-redux'
import { getActiveScene } from '../store/selectors'


class App extends Component {
  render () {
    console.log(this.props.activeScene)
    return (
        <View style={{flex: 1}}>
          <TabBar activeScene={this.props.activeScene} />
        </View>
    )
  }
}

const mapStateToProps = state => ({
  activeScene: getActiveScene(state)
})

export default connect(mapStateToProps)(App)
