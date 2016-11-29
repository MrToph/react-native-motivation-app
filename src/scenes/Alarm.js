import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
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
  render() {
    const { schedules } = this.props
    return (
      <View style={styles.container}>
        {
          schedules.map(
              (schedule) => {
                const { id, enabled, time, doesRepeat, activeDayMap } = schedule
                return (<TimeCard
                  id={id}
                  key={id}
                  enabled={enabled}
                  time={time}
                  doesRepeat={doesRepeat}
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
          onPress={() => console.log('hello')}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  schedules: getSchedules(state),
})

export default connect(mapStateToProps)(Alarm)
