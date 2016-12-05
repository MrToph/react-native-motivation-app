import React, { Component, PropTypes } from 'react'
import { View, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { createTimeNew } from '../store/alarm/actions'
import { getSchedules, getSnooze } from '../store/selectors'
import { TimeCard, SnoozeCard } from '../components'
import { primaryColor, textColor } from '../styling'

const styles = {
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 90, // so the floating button can be scrolled down without overlaying any TimeCards
  },
  actionButtonContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,  // 100% width
    right: 0,
    alignItems: 'center', // position button in center
  },
  actionButton: {
    backgroundColor: textColor,
  },
}

class Alarm extends Component {
  static propTypes = {
    snooze: PropTypes.shape({
      nextAlarmText: PropTypes.string,
      enabled: PropTypes.bool,
    }),
    schedules: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.number,
              enabled: PropTypes.bool,
              time: PropTypes.string,
              doesRepeat: PropTypes.bool,
              nextAlarmText: PropTypes.string,
              activeDayMap: PropTypes.shape({
                Sun: PropTypes.bool,
                Mon: PropTypes.bool,
                Tue: PropTypes.bool,
                Wed: PropTypes.bool,
                Thu: PropTypes.bool,
                Fri: PropTypes.bool,
                Sat: PropTypes.bool,
              }),
            }),
        ).isRequired,
  }

  onNewPress = () => {
    // eslint-disable-next-line
    this.props.dispatchTimeNew()
  }

  render() {
    const { schedules, snooze } = this.props
    return (
      <View>
        <ScrollView showVerticalScrollbar contentContainerStyle={styles.container}>
          <SnoozeCard
            nextAlarmText={snooze.nextAlarmText}
            enabled={snooze.enabled}
          />
          {
          schedules.map(
              (schedule) => {
                const { id, enabled, time, doesRepeat, nextAlarmText, activeDayMap } = schedule
                return (<TimeCard
                  id={id}
                  key={id}
                  enabled={enabled}
                  time={time}
                  doesRepeat={doesRepeat}
                  nextAlarmText={nextAlarmText}
                  activeDayMap={activeDayMap}
                />)
              },
          )
      }
        </ScrollView>
        <View style={styles.actionButtonContainer}>
          <Icon
            containerStyle={styles.actionButton}
            raised
            name="plus"
            type="font-awesome"
            color={primaryColor}
            onPress={this.onNewPress}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  schedules: getSchedules(state),
  snooze: getSnooze(state),
})

const mapDispatchToProps = dispatch => ({
  dispatchTimeNew: () => dispatch(createTimeNew()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Alarm)
