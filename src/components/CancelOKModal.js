import React, { Component, PropTypes } from 'react'
import { Modal, Text } from '../components'

export default class CancelOKModal extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onBack = this.onBack.bind(this)
  }

  render () {
    return (
      <Modal
        visible={this.props.visible}
        title={this.props.title}
        onBack={this.onBack}
        onSubmit={this.onSubmit}>
        <Text>{this.props.text}</Text>
      </Modal>
    )
  }

  onBack () {
    this.props.onBack()
  }

  onSubmit () {
    this.props.onSubmit()
  }
}

