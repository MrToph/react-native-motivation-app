import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { connect } from 'react-redux'
import { createTimeRepeatPressed, createTimeRepeatButtonPressed } from '../store/alarm/actions'
import { RepeatButton } from '../components'
import { textStyle } from '../components/Text'
import { primaryColor } from '../styling'
import { dayKeys } from '../constants'

const styles = {
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap', // no wrap-reverse available in RN
  },
  horizontalStart: {
    alignItems: 'flex-start',
  },
}

class RepeatPicker extends Component {
  static propTypes = {
    timeCardId: PropTypes.number.isRequired,
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

  onRepeatPress = () => {
    // eslint-disable-next-line
    this.props.dispatchTimeRepeatPressed(this.props.timeCardId)
  }

  render() {
    return (
      <View const style={styles.horizontalStart}>
        <CheckBox
          title="Repeat"
          containerStyle={{ borderWidth: 0, backgroundColor: 'transparent', marginHorizontal: 0, paddingHorizontal: 0 }}
          textStyle={[textStyle]}
          center
          checked={this.props.doesRepeat}
          iconLeft
          checkedColor={primaryColor}
          onPress={this.onRepeatPress}
        />
        {
          this.props.doesRepeat &&
          <View style={styles.horizontalContainer}>
            {
              dayKeys.map(
                  (dayKey, i) => <RepeatButton
                    timeCardId={this.props.timeCardId}
                    key={dayKey}
                    dayKey={dayKey}
                    text={dayKey[0]}
                    active={this.props.activeDayMap[dayKey]}
                    isLast={i === dayKeys.length - 1}
                  />,
              )
          }
          </View>
        }
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchTimeRepeatPressed: id => dispatch(createTimeRepeatPressed(id)),
  dispatchTimeRepeatButtonPressed: (id, dayKey) => dispatch(createTimeRepeatButtonPressed(id, dayKey)),
})

export default connect(null, mapDispatchToProps)(RepeatPicker)
