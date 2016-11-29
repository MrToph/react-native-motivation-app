import React, { Component } from 'react'
import { Text } from 'react-native'
import { typography } from 'react-native-material-design-styles'
import { textColor } from '../styling'

const textStyle = [typography.paperFontBody1, {
  color: textColor,
}]

export default class CusomText extends Component {
  render() {
    const style = this.props.style
    return (
      <Text
        {...this.props} style={style ? (Array.isArray(style) ? [...textStyle, ...style] : [...textStyle, style])
                               : [...textStyle]}
      />
    )
  }
}

export { textStyle }
