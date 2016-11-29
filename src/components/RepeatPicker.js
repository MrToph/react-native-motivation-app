import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { RepeatButton } from '../components'
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
  }
}

export default class RepeatPicker extends Component {
  static propTypes = {
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

  render() {
    return (
      <View const style={styles.horizontalStart}>
        <CheckBox
          title="Repeat"
          containerStyle={{ borderWidth: 0, backgroundColor: 'transparent', marginHorizontal: 0 }}
          center
          checked
          iconLeft
          checkedColor={primaryColor}
        />
        {
          this.props.doesRepeat &&
          <View style={styles.horizontalContainer}>
            {
              dayKeys.map(
                  (dayKey, i) => <RepeatButton
                    key={dayKey} dayKey={dayKey}
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
