import React, { Component, PropTypes } from 'react'
import { TouchableNativeFeedback, TouchableOpacity, View, TimePickerAndroid } from 'react-native'
import { Card, CheckBox, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { createTimeChanged } from '../store/alarm/actions'
import { TimeDisplay, RepeatPicker } from '../components'
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
    this.onBackgroundPress = this.onBackgroundPress.bind(this)
    this.onDeletePress = this.onDeletePress.bind(this)
    this.showTimePicker = this.showTimePicker.bind(this)
    this.state = {
      timePickerVisible: false,
    }
  }

  onBackgroundPress() {
    console.log('Clicked on the background. Should fire dispatch that fires Time Picker')
    this.showTimePicker()
  }

  onDeletePress() {
    console.log()
  }

  async showTimePicker() {
    console.log()
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false, // Will display '2 PM'
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
    const { enabled, time, doesRepeat, activeDayMap } = this.props
    return (
      <Card containerStyle={styles.card}>
        <TouchableNativeFeedback onPress={this.onBackgroundPress}>
          <View style={styles.container}>
            <View style={styles.horizontalContainer}>
              <TimeDisplay time={time} onPress={this.showTimePicker} />
              <CheckBox
                containerStyle={{ borderWidth: 0, backgroundColor: 'transparent' }}
                center
                checked={enabled}
                iconRight
                checkedColor={primaryColor}
              />
            </View>
            {
              enabled &&
              <RepeatPicker doesRepeat={doesRepeat} activeDayMap={activeDayMap} />
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
})

export default connect(null, mapDispatchToProps)(TimeCard)
