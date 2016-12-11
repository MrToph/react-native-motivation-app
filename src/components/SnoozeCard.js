import React, { Component, PropTypes } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Card, Icon } from 'react-native-elements'
import { typography } from 'react-native-material-design-styles'
import { connect } from 'react-redux'
import { createSnoozeDelete } from '../store/alarm/actions'
import { Text } from '../components'
import { textColor, dark2, dark4 } from '../styling'

const styles = {
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch', // horizontally stretch this container to take the full row even if items are smaller
  },
  card: {
    alignSelf: 'stretch',
    backgroundColor: dark4,
    borderColor: dark2,
  },
  container: {
    alignItems: 'flex-start',
  },
}

class SnoozeCard extends Component {
  static propTypes = {
    nextAlarmText: PropTypes.string,
    enabled: PropTypes.bool,
  }

  onDeletePress = () => {
    // eslint-disable-next-line
    this.props.dispatchSnoozeDelete(this.props.id)
  }

  render() {
    if (!this.props.enabled) {
      return (
        null
      )
    }
    return (
      <Card containerStyle={styles.card}>
        <View style={styles.container}>
          <View style={styles.horizontalContainer}>
            <Text style={typography.paperFontDisplay2}>
                Snooze
              </Text>
            <Text style={typography.paperFontCaption}>
              {
                  this.props.nextAlarmText
              }
            </Text>
            <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={this.onDeletePress}>
              <Icon name="delete" color={textColor} size={26} />
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchSnoozeDelete: id => dispatch(createSnoozeDelete(id)),
})

export default connect(null, mapDispatchToProps)(SnoozeCard)
