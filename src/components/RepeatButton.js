import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { color, typography } from 'react-native-material-design-styles'
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
    // this.props.dispatchRepButtonClick(this.props.type, this.props.name, this.props.index)
  }

  render() {
    const marginStyle = this.props.isLast ? null : styles.margin
    const activeStyle = this.props.active ? styles.active : null
    return (
      <TouchableOpacity
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
      </TouchableOpacity>
    )
  }

}

const mapDispatchToProps = (dispatch) => ({
    // dispatchRepButtonClick: (type, name, index) => dispatch(createRepeatButtonClick(type, name, index))
})

export default connect(null, mapDispatchToProps)(RepeatButton)
