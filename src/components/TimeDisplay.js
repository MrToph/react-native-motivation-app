import React, { Component, PropTypes } from 'react'
import { TouchableOpacity } from 'react-native'
import { Button, Card, Icon } from 'react-native-elements'
import { Text } from '../components'
import { primaryColor } from '../styling'
import { typography } from 'react-native-material-design-styles'

export default class TimeDisplay extends Component {
  constructor(props) {
    super(props)
    this.onPress = this.onPress.bind(this)
  }

  onPress() {
    console.log()
  }

  render() {
    return (
      <TouchableOpacity onPress={this.onPress}>
        <Text style={typography.paperFontDisplay2}>7:30</Text>
      </TouchableOpacity>
    )
  }

}
