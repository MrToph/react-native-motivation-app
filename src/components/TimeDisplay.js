import React, { Component, PropTypes } from 'react'
import { TouchableOpacity } from 'react-native'
import { typography } from 'react-native-material-design-styles'
import { Text } from '../components'

export default class TimeDisplay extends Component {
  static propTypes = {
    time: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  }

  render() {
    // React-Native doesn't have `adjustsFontSizeToFit` for Android yet
    const timeLength = this.props.time.length
    // AM / PM really stretches it
    const fontSize = timeLength > 5 ? typography.paperFontHeadline : typography.paperFontDisplay1
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Text style={fontSize}>{this.props.time}</Text>
      </TouchableOpacity>
    )
  }

}
