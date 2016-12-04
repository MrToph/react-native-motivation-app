import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { typography } from 'react-native-material-design-styles'
import { connect } from 'react-redux'
import { textStyle } from '../components/Text'
import { getSettingsState } from '../store/selectors'
import { createWiFiOnlyPressed, createCustomVideoPressed, createSnoozeTimeChanged,
  createCustomVideoIdChanged, createVolumeChanged } from '../store/settings/actions'
import { Text, TextInputRow } from '../components'
import { primaryColor } from '../styling'
import { isInt } from '../utils'

const styles = {
  container: { alignItems: 'flex-start' },
  textInput: { flex: 0, textAlign: 'center' },
  volumeInput: { width: 60 },
  customVideoInput: { width: 150 },
  snoozeMinutesInput: { width: 60 },
}

class Settings extends Component {
  static propTypes = {
    playCustom: PropTypes.bool.isRequired,
    playCustomVideoId: PropTypes.string.isRequired,
    wifiOnly: PropTypes.bool.isRequired,
    volume: PropTypes.number.isRequired,
    snoozeMinutes: PropTypes.number.isRequired,
  }

  onVolumeSubmit = (event) => {
    const { text } = event.nativeEvent
    if (isInt(text)) {
      // eslint-disable-next-line
      this.props.dispatchVolumeChanged(parseInt(text))
    }
  }

  onYouTubeSubmit = (event) => {
    const { text } = event.nativeEvent
    // eslint-disable-next-line
    this.props.dispatchCustomVideoIdChanged(text)
  }

  onSnoozeSubmit = (event) => {
    const { text } = event.nativeEvent
    if (isInt(text)) {
      // eslint-disable-next-line
      this.props.dispatchSnoozeTimeChanged(parseInt(text))
    }
  }

  onWiFiOnlyPress = () => {
    // eslint-disable-next-line
    this.props.dispatchWiFiOnlyPressed()
  }

  onCustomVideoPress = () => {
    // eslint-disable-next-line
    this.props.dispatchCustomVideoPressed()
  }


  render() {
    const { playCustomVideoId, snoozeMinutes, volume } = this.props
    console.log(this.props)
    return (
      <View>
        <Text style={[{ color: primaryColor, alignSelf: 'center' }, typography.paperFontTitle]}>Settings</Text>
        <CheckBox
          title="Only stream when connected to Wi-Fi"
          containerStyle={{ borderWidth: 0, backgroundColor: 'transparent', marginHorizontal: 0 }}
          textStyle={textStyle}
          checked={this.props.wifiOnly}
          iconLeft
          checkedColor={primaryColor}
          onPress={this.onWiFiOnlyPress}
        />
        <TextInputRow
          textBefore="Video Volume:"
          textAfter="%"
          onSubmit={this.onVolumeSubmit}
          inputStyle={[styles.textInput, styles.volumeInput]}
          inputProps={{
            placeholder: 'Video-ID',
            maxLength: 6,
            keyboardType: 'numeric',
            defaultValue: typeof volume !== 'undefined' ? volume.toString() : '',
          }}
        />
        <CheckBox
          title="Play Custom YouTube Video"
          containerStyle={{ borderWidth: 0, backgroundColor: 'transparent', marginHorizontal: 0 }}
          textStyle={textStyle}
          checked={this.props.playCustom}
          iconLeft
          checkedColor={primaryColor}
          onPress={this.onCustomVideoPress}
        />
        <TextInputRow
          textBefore="YouTube Video-ID:"
          onSubmit={this.onYouTubeSubmit}
          inputStyle={[styles.textInput, styles.customVideoInput]}
          inputProps={{
            placeholder: 'Video-ID',
            maxLength: 15,
            defaultValue: typeof playCustomVideoId !== 'undefined' ? playCustomVideoId : '',
          }}
        />
        <TextInputRow
          textBefore="Snooze Time:"
          textAfter="minutes"
          onSubmit={this.onSnoozeSubmit}
          inputStyle={[styles.textInput, styles.snoozeMinutesInput]}
          inputProps={{
            placeholder: 'minutes',
            maxLength: 6,
            keyboardType: 'numeric',
            defaultValue: typeof snoozeMinutes !== 'undefined' ? snoozeMinutes.toString() : '',
          }}
        />
      </View>
    )
  }
}

const mapStateToProps = state => getSettingsState(state)

const mapDispatchToProps = dispatch => ({
  dispatchWiFiOnlyPressed: () => dispatch(createWiFiOnlyPressed()),
  dispatchCustomVideoPressed: () => dispatch(createCustomVideoPressed()),
  dispatchSnoozeTimeChanged: val => dispatch(createSnoozeTimeChanged(val)),
  dispatchCustomVideoIdChanged: val => dispatch(createCustomVideoIdChanged(val)),
  dispatchVolumeChanged: val => dispatch(createVolumeChanged(val)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
