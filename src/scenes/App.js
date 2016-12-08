import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { getActiveScene } from '../store/selectors'
import { TabBar, Banner } from '../components'
import { adBannerHeight } from '../styling'

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,  // set both top and bottom, such that the height is implicitly set
    left: 0,
    right: 0,
  },
  banner: {
    position: 'absolute',
    top: 0,  // works because container has a height
    left: 0,
    right: 0,
  },
  tabBar: {
    flex: 1,
    marginTop: adBannerHeight,
  },
}

class App extends Component {
  static propTypes = {
    activeScene: PropTypes.string.isRequired,
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.tabBar}>
          <TabBar tabBarStyle={styles.tabBar} activeScene={this.props.activeScene} />
        </View>
        <Banner style={styles.banner} />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  activeScene: getActiveScene(state),
})

export default connect(mapStateToProps)(App)
