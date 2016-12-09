import React, { Component } from 'react'
import { View } from 'react-native'
import { AdMobBanner, AdMobInterstitial } from 'react-native-admob'
import { adUnitID, adSnoozeInterstitial } from '../constants'
import { adBannerHeight } from '../styling'

// may only be set once, otherwise error
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
  }

  bannerError = (error) => {
    console.log(error)
  }

  render() {
    const style = this.props.style
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
