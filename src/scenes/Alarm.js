import React, { Component } from 'react'
import { View } from 'react-native'
import { Icon } from 'react-native-elements'
import { TimeCard } from '../components'
import { primaryColor } from '../styling'

export default class Alarm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <TimeCard />
                <TimeCard />
                <Icon
                    raised
                    name='plus'
                    type='font-awesome'
                    color={primaryColor}
                    onPress={() => console.log('hello')} />
            </View>
        )
    }
}

const styles = {
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
}
