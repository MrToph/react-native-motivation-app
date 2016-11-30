import React, { Component, PropTypes } from 'react'
import { StyleSheet, View } from 'react-native'
import { typography } from 'react-native-material-design-styles'
import TextInput from '../components/TextInput'
import Text from '../components/Text'

/**
 * A component that renders a text before and (optional) after a TextInput
 */
export default class TextInputRow extends Component {
  static propTypes = {
    textBefore: PropTypes.string.isRequired,
    textAfter: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    inputStyle: PropTypes.object,
    inputProps: PropTypes.object,  // additional props supplied to TextInput
  }

  render() {
    const { textBefore, textAfter, inputStyle, inputProps } = this.props
    return (
      <View style={styles.horizontalContainer}>
        <Text style={[styles.text, typography.paperFontSubhead]}>
          {textBefore}
        </Text>
        <TextInput
          ref={this.onRef}
          style={[styles.text, styles.textInput, inputStyle]}
          selectTextOnFocus
          returnKeyType="done"
          onSubmitEditing={this.onSubmitEditing}
          // placeholder='Weight'
          // maxLength={inputMaxLength}
          // defaultValue=''
          {...inputProps}
        />
        <Text>
          {textAfter}
        </Text>
      </View>
    )
  }

  onRef = (ref) => {
    if (ref) this.setState({ textInputRef: ref })
  }

  onSubmitEditing = (val) => {
    if (this.state.textInputRef) {
      this.state.textInputRef.blur()
    }
    this.props.onSubmit(val)
  }
}

const styles = StyleSheet.create({
  horizontalContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textInput: { flex: 1, textAlign: 'center' },
})
