import React, { Component, PropTypes } from 'react'
import { TouchableNativeFeedback, View } from 'react-native'
import { Button, Card, CheckBox } from 'react-native-elements'
import { Text, TimeDisplay, RepeatPicker } from '../components'
import { primaryColor } from '../styling'

export default class TimeCard extends Component {
  constructor(props) {
    super(props)
    this.onPress = this.onPress.bind(this)
  }

  onPress() {
    console.log('Clicked on the background. Should do nothing as we show the full card all the time?')
  }

  render() {
    return (
      <Card>
        <TouchableNativeFeedback onPress={this.onPress}>
          <View>
            <View style={styles.horizontalContainer}>
              <TimeDisplay />
              <CheckBox
                containerStyle={{ borderWidth: 0, backgroundColor: 'transparent' }}
                center
                checked
                iconRight
                checkedColor={primaryColor}
              />
            </View>
            <RepeatPicker />
            <Button
              icon={{ name: 'code' }}
              backgroundColor={primaryColor}
              fontFamily="Lato"
              buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
              title="View now"
            />
          </View>
        </TouchableNativeFeedback>
      </Card>
    )
  }
}

const styles = {
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}
