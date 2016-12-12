import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Modal, Text } from '../components'
import { createRingtoneModalDismissPressed } from '../store/navigation/actions'
import { createSnoozePressed } from '../store/alarm/actions'
import { getRingtoneModalVisible } from '../store/selectors'

class RingtoneModal extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)
    this.onSnooze = this.onSnooze.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
  }

  onDismiss() {
    // eslint-disable-next-line
    this.props.dispatchRingtoneModalDismissPressed()
  }

  onSnooze() {
    // eslint-disable-next-line
    this.props.dispatchSnoozePressed()
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        title="Alarm"
        onDismiss={this.onDismiss}
        dismissText="Stop"
        onSubmit={this.onSnooze}
        submitText="Snooze"
      >
        <Text>Stop or snooze the alarm.</Text>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  visible: getRingtoneModalVisible(state),
})

const mapDispatchToProps = dispatch => ({
  dispatchRingtoneModalDismissPressed: () => dispatch(createRingtoneModalDismissPressed()),
  dispatchSnoozePressed: () => dispatch(createSnoozePressed()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RingtoneModal)
