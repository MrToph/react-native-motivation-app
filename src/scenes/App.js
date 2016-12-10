import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import { createOrientationChanged } from '../store/navigation/actions'
import { getActiveScene, isOrientationLandscape } from '../store/selectors'
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
  tabBarContainer: {
    flex: 1,
    marginTop: adBannerHeight,
  },
  tabBarContainerLandscape: {
    marginTop: 0,
  },
}

class App extends Component {
  static propTypes = {
    activeScene: PropTypes.string.isRequired,
    isLandscape: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    Orientation.addOrientationListener(this.orientationChanged)
    Orientation.getOrientation((err, orientation) => {
      if (err) return
      // eslint-disable-next-line
      this.props.dispatchOrientationChanged(orientation)
    })
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this.orientationChanged)
  }

  orientationChanged = (orientation) => {
    // eslint-disable-next-line
    this.props.dispatchOrientationChanged(orientation)
  }

  render() {
    const { activeScene, isLandscape } = this.props
    return (
      <View style={styles.container}>
        <View
          style={[styles.tabBarContainer, isLandscape && styles.tabBarContainerLandscape]}
        >
          <TabBar
            activeScene={activeScene}
            hideTabBar={isLandscape}
          />
        </View>
        {
          !isLandscape &&
          <Banner style={styles.banner} />
        }
      </View>
    )
  }
}

const mapStateToProps = state => ({
  activeScene: getActiveScene(state),
  isLandscape: isOrientationLandscape(state),
})

const mapDispatchToProps = dispatch => ({
  dispatchOrientationChanged: orientation => dispatch(createOrientationChanged(orientation)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
