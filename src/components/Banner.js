import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { AdMobBanner, AdMobInterstitial } from 'react-native-admob'
import { adUnitID, adSnoozeInterstitial } from '../constants'
import { adBannerHeight } from '../styling'

AdMobInterstitial.setAdUnitID(adSnoozeInterstitial)

const styles = {
  banner: {
    alignSelf: 'stretch',
    height: adBannerHeight,
  },
}

export default class Banner extends Component {
  static propTypes = {
    style: View.propTypes.style,
    freeVersion: PropTypes.bool.isRequired,
  }

  bannerError = (error) => {
    console.log(error)
  }

  render() {
    const style = this.props.style
    if (!this.props.freeVersion) {
      return (
        null
      )
    }
    return (
      <View style={[styles.banner, style]}>
        <AdMobBanner
          bannerSize="smartBannerPortrait"
          adUnitID={adUnitID}
          // testDeviceID='EMULATOR' // TEST_EMULATOR on Android
          didFailToReceiveAdWithError={this.bannerError}
        />
      </View>
    )
  }
}
