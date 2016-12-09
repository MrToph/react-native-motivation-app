import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { typography } from 'react-native-material-design-styles'
import { textColor } from '../styling'
import TextInput from '../components/TextInput'
import Text from '../components/Text'

const styles = {
  horizontalContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textInput: { flex: 1, textAlign: 'center' },
  text: [typography.paperFontBody1, {
    color: textColor,
  }],
}

/**
 * A component that renders a text before and (optional) after a TextInput
 */
export default class TextInputRow extends Component {
  static propTypes = {
    textBefore: PropTypes.string.isRequired,
    textAfter: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    inputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    // eslint-disable-next-line
    inputProps: PropTypes.object, // same propTypes as TextInput from 'react-native'
  }

  onRef = (ref) => {
    if (ref) this.setState({ textInputRef: ref })
  }

  // gets called when focusing other textinput even when no submit button pressed
  // but also when submit button pressed
  onEndEditing = (val) => {
    this.props.onSubmit(val)
  }

  // when clicked on submit button keyboard
  onSubmitEditing = () => {
    if (this.state.textInputRef) {
      this.state.textInputRef.blur()
    }
  }

  render() {
    const { textBefore, textAfter, inputStyle, inputProps } = this.props
    const mergedStyle = [styles.text, styles.textInput]
    if (Array.isArray(inputStyle)) mergedStyle.push(...inputStyle)
    else mergedStyle.push(inputStyle)
    return (
      <View style={styles.horizontalContainer}>
        <Text style={[styles.text]}>
          {textBefore}
        </Text>
        <TextInput
          ref={this.onRef}
          style={mergedStyle}
          selectTextOnFocus
          returnKeyType="done"
          onSubmitEditing={this.onSubmitEditing}
          onEndEditing={this.onEndEditing}
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
}
