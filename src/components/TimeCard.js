import React, { Component, PropTypes } from 'react'
import { TouchableNativeFeedback, View } from 'react-native'
import { Button, Card } from 'react-native-elements'
import Text from '../components/Text'
import TimeDisplay from '../components/TimeDisplay'
import { primaryColor } from '../styling'

export default class TimeCard extends Component {
    constructor(props) {
        super(props)
        this.onPress = this.onPress.bind(this)
    }

    render() {
        return (
            <Card>
            <TouchableNativeFeedback onPress={this.onPress}>
            <View>
                <TimeDisplay />
                <Text style={{marginBottom: 10}}>
                    The idea with React Native Elements is more about component structure than actual design.
                </Text>
                <Button
                    icon={{name: 'code'}}
                    backgroundColor={primaryColor}
                    fontFamily='Lato'
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='View now' />
            </View>
            </TouchableNativeFeedback>
            </Card>
        )
    }

    onPress() {
        console.log('Clicked on the background. Should do nothing as we show the full card all the time?')
    }
}
