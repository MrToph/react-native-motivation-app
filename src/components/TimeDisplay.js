import React, { Component, PropTypes } from 'react'
import { TouchableOpacity } from 'react-native'
import { Button, Card, Icon } from 'react-native-elements'
import Text from '../components/Text'
import { primaryColor } from '../styling'
import { typography } from 'react-native-material-design-styles'

export default class TimeDisplay extends Component {
    constructor(props) {
        super(props)
        this.onPress = this.onPress.bind(this)
    }

    render() {
        return (
            <TouchableOpacity onPress={this.onPress}>
                <Text style={typography.paperFontDisplay2}>7:30</Text>
            </TouchableOpacity>
        )
    }

    onPress() {
        console.log()
    }
}

const styles = {
    text: {
    }
}