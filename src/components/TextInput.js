import React from 'react'
import { TextInput } from 'react-native'
import { textStyle } from '../components/Text'

// inherts Text, s.t. member functions work, i.e., focus is redirected to super and it magically works
export default class CusomTextInput extends TextInput {
  render() {
    const style = this.props.style
    return (
      <TextInput
        {...this.props} style={style ? (Array.isArray(style) ? [...textStyle, ...style] : [...textStyle, style])
        : [...textStyle]}
      />
    )
  }
}
