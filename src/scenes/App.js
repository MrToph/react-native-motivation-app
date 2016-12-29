import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import { createOrientationChanged } from '../store/navigation/actions'
import { getActiveScene, isOrientationLandscape, getFreeVersion } from '../store/selectors'
import { TabBar, Banner, RingtoneModal } from '../components'
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
  tabBarContainerNoAds: {
    marginTop: 0,
  },
  tabBarContainerLandscape: {
    marginTop: 0,
  },
}

class App extends Component {
  static propTypes = {
    activeScene: PropTypes.string.isRequired,
    isLandscape: PropTypes.bool.isRequired,
    freeVersion: PropTypes.bool.isRequired,
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
    const { activeScene, isLandscape, freeVersion } = this.props
    return (
      <View style={styles.container}>
        <View
          style={[styles.tabBarContainer, !freeVersion && styles.tabBarContainerNoAds, isLandscape && styles.tabBarContainerLandscape]}
        >
          <TabBar
            activeScene={activeScene}
            hideTabBar={isLandscape}
          />
        </View>
        {
          !isLandscape &&
          <Banner style={styles.banner} freeVersion={freeVersion} />
        }
        <RingtoneModal />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  activeScene: getActiveScene(state),
  isLandscape: isOrientationLandscape(state),
  freeVersion: getFreeVersion(state),
})

const mapDispatchToProps = dispatch => ({
  dispatchOrientationChanged: orientation => dispatch(createOrientationChanged(orientation)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
