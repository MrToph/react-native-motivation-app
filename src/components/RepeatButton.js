import React, { Component, PropTypes } from 'react'
import { View, TouchableNativeFeedback } from 'react-native'
import { connect } from 'react-redux'
import { color } from 'react-native-material-design-styles'
import { createTimeRepeatButtonPressed } from '../store/alarm/actions'
import { Text } from '../components'
import { primaryColor, textColorOnPrimary, repeatButtonSize } from '../styling'

const styles = {
  circularContainer: {
    backgroundColor: color.paperGrey400.color,
    height: repeatButtonSize,
    width: repeatButtonSize,
    borderRadius: repeatButtonSize / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: repeatButtonSize / 4,
  },
  active: {
    backgroundColor: primaryColor,
  },
  margin: {
    marginRight: repeatButtonSize / 4,
  },
  hitSlop: {
    top: repeatButtonSize / 4,
    left: repeatButtonSize / 4,
    bottom: repeatButtonSize / 4,
    right: repeatButtonSize / 4,
  },
}

class RepeatButton extends Component {
  static propTypes = {
    timeCardId: PropTypes.number.isRequired,
    dayKey: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    active: PropTypes.bool,
    isLast: PropTypes.bool, // if it is the last button we don't set its margin-right prop
  }

  constructor(props) {
    super(props)
    this.onPress = this.onPress.bind(this)
  }

  onPress() {
    // eslint-disable-next-line
    this.props.dispatchRepeatButtonPressed(this.props.timeCardId, this.props.dayKey)
  }

  render() {
    const marginStyle = this.props.isLast ? null : styles.margin
    const activeStyle = this.props.active ? styles.active : null
    return (
      <TouchableNativeFeedback
        hitSlop={styles.hitSlop}
        onPress={this.onPress}
        delayPressIn={0}
        delayPressOut={0}
      >
        <View style={[styles.circularContainer, marginStyle, activeStyle]}>
          <Text style={{ color: textColorOnPrimary }}>
            {this.props.text}
          </Text>
        </View>
      </TouchableNativeFeedback>
    )
  }

}

const mapDispatchToProps = dispatch => ({
  dispatchRepeatButtonPressed: (id, dayKey) => dispatch(createTimeRepeatButtonPressed(id, dayKey)),
})

export default connect(null, mapDispatchToProps)(RepeatButton)
