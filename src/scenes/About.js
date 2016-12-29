import React, { Component, PropTypes } from 'react'
import { ScrollView, View, TouchableOpacity, Linking } from 'react-native'
import { connect } from 'react-redux'
import { typography } from 'react-native-material-design-styles'
import Device from 'react-native-device-info'
import { getFreeVersion } from '../store/selectors'
import { createNoAdsPurchased } from '../store/settings/actions'
import { purchaseNoAds } from '../services/billing'
import { Text } from '../components'
import { packageName, appName, mail } from '../constants'
import { primaryColor } from '../styling'

const styles = {
  horizontalContainer: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' },
  text: { marginHorizontal: 16 }, // as in Checkbox from material-design
  highlight: { color: primaryColor },
  textInput: { flex: 0, width: 60, textAlign: 'center' }, // overwrite standard flex: 1 in TextInputRow
  subheading: { marginTop: 25, color: primaryColor, textAlign: 'center' },
}

class About extends Component {
  static propTypes = {
    freeVersion: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)
    this.onBuy = this.onBuy.bind(this)
  }

  onFeedback = () => {
    let body = `\n\n-------------\nWrite above this line\n${Device.getManufacturer()} | ${Device.getBrand()} | `
    body += `${Device.getModel()} | ${Device.getDeviceId()}\n`
    body += `${Device.getSystemName()} ${Device.getSystemVersion()} | Build: ${Device.getReadableVersion()} ${Device.getDeviceLocale()}`
    Linking.openURL(`mailto:${mail}?subject=[${appName}]%20Feedback&body=${body}`).catch(err => console.log('About:onFeedback', err))
  }

  onRate = () => {
    Linking.openURL(`market://details?id=${packageName}`).catch(() => {
      // try to open it in browser
      Linking.openURL(`http://play.google.com/store/apps/details?id=${packageName}`).catch(() => {
      })
    })
  }

  async onBuy() {
    const purchased = await purchaseNoAds()
    if (purchased) this.props.dispatchNoAdsPurchased()  // eslint-disable-line
  }

  onWebsite = () => {
    Linking.openURL(`http://cmichel.io/?ref=${appName}`).catch(err => console.log('About:onWebsite', err))
  }

  onTwitter = () => {
    Linking.openURL('https://twitter.com/cmichelio').catch(err => console.log('About:onTwitter', err))
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator>
        <Text style={[typography.paperFontTitle, styles.text, styles.subheading]}>
          Application
        </Text>
        <Text style={[typography.paperFontSubhead, styles.text]}>
          {`Version: ${Device.getReadableVersion()}`}
        </Text>
        <TouchableOpacity onPress={this.onFeedback}>
          <View>
            <Text style={[typography.paperFontSubhead, styles.text]}>
              Feedback
            </Text>
            <Text style={[styles.text]}>
              Suggestions? Comments? Bugs? Click to mail me.
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onRate}>
          <Text style={[typography.paperFontSubhead, styles.text]}>
            Rate this app
          </Text>
          <Text style={[styles.text]}>
            {'If you like this app, please rate it.\nIt helps more people discover it and motivates me to work on new features.'}
          </Text>
        </TouchableOpacity>
        { this.props.freeVersion &&
        <TouchableOpacity onPress={this.onBuy}>
          <Text style={[typography.paperFontSubhead, styles.text, styles.highlight]}>
            Remove Ads
          </Text>
          <Text style={[styles.text, styles.highlight]}>
            {'If you don\'t like the ads and want to support me, you can purchase an ad-free version by clicking here.'}
          </Text>
        </TouchableOpacity>
        }
        <Text style={[typography.paperFontTitle, styles.text, styles.subheading]}>
          Social Media
        </Text>
        <TouchableOpacity onPress={this.onWebsite}>
          <Text style={[typography.paperFontSubhead, styles.text]}>
            Developer Website
          </Text>
          <Text style={[styles.text]}>
            Want to get in touch with me personally? Want to hire me?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onTwitter}>
          <Text style={[typography.paperFontSubhead, styles.text]}>
            Developer Twitter
          </Text>
          <Text style={[styles.text]}>
            Follow me on Twitter: @cmichelio
          </Text>
        </TouchableOpacity>
        <Text style={[typography.paperFontTitle, styles.text, styles.subheading]}>
          Videos
        </Text>
        <Text style={[typography.paperFontSubhead, styles.text]}>
            Most videos are created by the following YouTube channels:
          </Text>
        <Text style={[styles.text]} multiline>
          {
            'Absolute Motivation\nMulliganBrothers Motivation\nRedFrost Motivation'
          }
        </Text>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  freeVersion: getFreeVersion(state),
})

const mapDispatchToProps = dispatch => ({
  dispatchNoAdsPurchased: () => dispatch(createNoAdsPurchased()),
})

export default connect(mapStateToProps, mapDispatchToProps)(About)
