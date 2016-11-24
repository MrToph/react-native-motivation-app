import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Video from './Video'

export default class App extends Component {
  render () {
    return (
        <View style={{flex: 1}}>
            <Text>Hello</Text>
            <Video />
        </View>
    )
  }
}
