import React, { Component, PropTypes } from 'react'
import { TouchableNativeFeedback, TouchableOpacity, View, TimePickerAndroid } from 'react-native'
import { Card, CheckBox, Icon } from 'react-native-elements'
import { typography } from 'react-native-material-design-styles'
import { connect } from 'react-redux'
import { createTimeChanged, createTimeDelete, createTimeEnabledPressed } from '../store/alarm/actions'
import { TimeDisplay, RepeatPicker, Text } from '../components'
import { primaryColor } from '../styling'

const styles = {
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch', // horizontally stretch this container to take the full row even if items are smaller
  },
  card: {
    alignSelf: 'stretch',
  },
  container: {
    alignItems: 'flex-start',
  },
}

class TimeCard extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,  // used for identification when dispatching from this component
    enabled: PropTypes.bool,
    time: PropTypes.string,
    nextAlarmText: PropTypes.string,
    doesRepeat: PropTypes.bool,
    activeDayMap: PropTypes.shape({
      Sun: PropTypes.bool,
      Mon: PropTypes.bool,
      Tue: PropTypes.bool,
      Wed: PropTypes.bool,
      Thu: PropTypes.bool,
      Fri: PropTypes.bool,
      Sat: PropTypes.bool,
    }),
  }

  constructor(props) {
    super(props)
    this.showTimePicker = this.showTimePicker.bind(this)
    this.state = {
      timePickerVisible: false,
    }
  }

  onBackgroundPress = () => {
    this.showTimePicker()
  }

  onEnabledPress = () => {
    // eslint-disable-next-line
    this.props.dispatchTimeEnabledPressed(this.props.id)
  }

  onDeletePress = () => {
    // eslint-disable-next-line
    this.props.dispatchTimeDelete(this.props.id)
  }

  async showTimePicker() {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
      })
      if (action !== TimePickerAndroid.dismissedAction) {
        // eslint-disable-next-line
        this.props.dispatchTimeChanged(this.props.id, hour, minute)
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message)
    }
  }

  render() {
    const { id, enabled, time, doesRepeat, activeDayMap } = this.props
    return (
      <Card containerStyle={styles.card}>
        <TouchableNativeFeedback onPress={this.onBackgroundPress}>
          <View style={styles.container}>
            <View style={styles.horizontalContainer}>
              <TimeDisplay time={time} onPress={this.showTimePicker} />
              <Text style={typography.paperFontCaption}>
                {
                  this.props.nextAlarmText
                }
              </Text>
              <CheckBox
                containerStyle={{ borderWidth: 0, backgroundColor: 'transparent' }}
                center
                checked={enabled}
                iconRight
                checkedColor={primaryColor}
                onPress={this.onEnabledPress}
              />
            </View>
            {
              enabled &&
              <RepeatPicker timeCardId={id} doesRepeat={doesRepeat} activeDayMap={activeDayMap} />
            }
            <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={this.onDeletePress}>
              <Icon name="delete" size={26} />
            </TouchableOpacity>
          </View>
        </TouchableNativeFeedback>
      </Card>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchTimeChanged: (id, hour, minute) => dispatch(createTimeChanged(id, hour, minute)),
  dispatchTimeDelete: id => dispatch(createTimeDelete(id)),
  dispatchTimeEnabledPressed: id => dispatch(createTimeEnabledPressed(id)),
})

export default connect(null, mapDispatchToProps)(TimeCard)
