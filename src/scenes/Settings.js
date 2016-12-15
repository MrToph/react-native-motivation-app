import React, { Component, PropTypes } from 'react'
import { ScrollView, View, Slider } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { typography } from 'react-native-material-design-styles'
import { connect } from 'react-redux'
import { textStyle } from '../components/Text'
import { getSettingsState } from '../store/selectors'
import { createWiFiOnlyPressed, createCustomVideoPressed, createSnoozeTimeChanged,
  createCustomVideoIdChanged, createVolumeChanged } from '../store/settings/actions'
import { Text, TextInputRow } from '../components'
import { primaryColor } from '../styling'
import { isInt, padLeft } from '../utils'

const styles = {
  container: { alignItems: 'flex-start' },
  textInput: { flex: 0, textAlign: 'center' },
  volumeInput: { width: 60 },
  customVideoInput: { width: 150 },
  snoozeMinutesInput: { width: 60 },
  slider: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  horizontalContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
}

class Settings extends Component {
  static propTypes = {
    playCustom: PropTypes.bool.isRequired,
    playCustomVideoId: PropTypes.string.isRequired,
    wifiOnly: PropTypes.bool.isRequired,
    volume: PropTypes.number.isRequired,
    snoozeMinutes: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      volume: props.volume,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      volume: nextProps.volume,
    })
  }

  onVolumeChange = (volume) => {
    this.setState({
      volume,
    })
  }

  onVolumeSubmit = () => {
    const { volume } = this.state
    if (isInt(volume)) {
      // eslint-disable-next-line
      this.props.dispatchVolumeChanged(parseInt(volume))
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
    const { playCustomVideoId, snoozeMinutes } = this.props
    return (
      <ScrollView showVerticalScrollbar>
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
        <View style={styles.horizontalContainer}>
          <Text>
            {`Video Volume: ${padLeft('\u2000', 2, this.state.volume)}%`}
          </Text>
          <Slider
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={this.props.volume}
            onSlidingComplete={this.onVolumeSubmit}
            onValueChange={value => this.onVolumeChange(value)}
            style={styles.slider}
          />
        </View>
        <TextInputRow
          textBefore="Snooze Length:"
          textAfter="minutes"
          onSubmit={this.onSnoozeSubmit}
          inputStyle={[styles.textInput, styles.snoozeMinutesInput]}
          inputProps={{
            placeholder: '',
            maxLength: 6,
            keyboardType: 'numeric',
            defaultValue: typeof snoozeMinutes !== 'undefined' ? snoozeMinutes.toString() : '',
          }}
        />
        <CheckBox
          title="Play custom YouTube video"
          containerStyle={{ borderWidth: 0, backgroundColor: 'transparent', marginHorizontal: 0 }}
          textStyle={textStyle}
          checked={this.props.playCustom}
          iconLeft
          checkedColor={primaryColor}
          onPress={this.onCustomVideoPress}
        />
        {this.props.playCustom &&
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
        }
      </ScrollView>
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
