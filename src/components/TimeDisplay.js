import React, { Component, PropTypes } from 'react'
import { TouchableOpacity } from 'react-native'
import { typography } from 'react-native-material-design-styles'
import { Text } from '../components'
import { primaryColor } from '../styling'

export default class TimeDisplay extends Component {
  static propTypes = {
    time: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Text style={typography.paperFontDisplay2}>{this.props.time}</Text>
      </TouchableOpacity>
    )
  }

}
