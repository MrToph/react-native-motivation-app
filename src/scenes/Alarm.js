import React, { Component, PropTypes } from 'react'
import { ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { createTimeNew } from '../store/alarm/actions'
import { getSchedules } from '../store/selectors'
import { TimeCard } from '../components'
import { primaryColor } from '../styling'

const styles = {
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
}

class Alarm extends Component {
  static propTypes = {
    schedules: PropTypes.arrayOf(
            PropTypes.shape({
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
    const { schedules } = this.props
    return (
      <ScrollView showVerticalScrollbar contentContainerStyle={styles.container}>
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
        <Icon
          raised
          name="plus"
          type="font-awesome"
          color={primaryColor}
          onPress={this.onNewPress}
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({
  schedules: getSchedules(state),
})

const mapDispatchToProps = dispatch => ({
  dispatchTimeNew: () => dispatch(createTimeNew()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Alarm)
