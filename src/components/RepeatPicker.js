import React, { Component } from 'react'
import { View } from 'react-native'
import { RepeatButton } from '../components'

const styles = {
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
}

export default class RepeatPicker extends Component {
  render() {
    const dayKeys = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return (
      <View style={styles.horizontalContainer}>
        {
            dayKeys.map(
                (dayKey, i) => <RepeatButton key={dayKey} dayKey={dayKey} text={dayKey[0]} active={!!(i % 2)} isLast={i === dayKeys.length - 1} />,
            )
        }
      </View>
    )
  }
}
