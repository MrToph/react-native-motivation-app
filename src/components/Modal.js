import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, Modal, Button } from 'react-native'
import { typography } from 'react-native-material-design-styles'
import { Text } from '../components'
import { primaryColor, dark4 } from '../styling'

const styles = StyleSheet.create({
  modalContainer: { // spans the WHOLE page. used to set the one inner item to the vertical middle
    flex: 1,  // span over whole page
    alignItems: 'stretch', // horizontal center it
    justifyContent: 'center', // vertical center content
    padding: 20,  // so inner content is not full width
    backgroundColor: 'rgba(0,0,0,0.5)',  // darkened background
  },
  innerContainer: {
    flexDirection: 'column',
    backgroundColor: dark4,
    borderRadius: 10, // rounded corners
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  buttonContainer: {
    marginTop: 20,
    alignSelf: 'stretch', // stretch container horizontally
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})

export default class MyModal extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func,
    submitText: PropTypes.string,
    onDismiss: PropTypes.func,
    dismissText: PropTypes.string,
    customStyle: PropTypes.shape({
      modalContainer: PropTypes.object,
      innerContainer: PropTypes.object,
      buttonContainer: PropTypes.object,
    }),
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
    this.onDismiss = this.onDismiss.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onRequestClose = this.onRequestClose.bind(this)
  }

  // gets called on back button of phone
  onRequestClose() {
    this.onDismiss()
  }

  onDismiss() {
    if (this.props.onDismiss) this.props.onDismiss()
  }

  onSubmit() {
    if (this.props.onSubmit) this.props.onSubmit()
  }

  render() {
    if (this.props.customStyle) {
      var { modalContainer, innerContainer, buttonContainer } = this.props.customStyle
    }
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.props.visible}
        onRequestClose={this.onRequestClose}
      >
        <View style={[styles.modalContainer, modalContainer]}>
          <View style={[styles.innerContainer, innerContainer]}>
            <Text style={[typography.paperFontTitle, { color: primaryColor }]}>
              {this.props.title}
            </Text>
            {this.props.children}
            <View style={[styles.buttonContainer, buttonContainer]}>
              <Button color={primaryColor} title={this.props.dismissText || 'Back'} onPress={this.onDismiss} />
              <Button color={primaryColor} title={this.props.submitText || 'OK'} onPress={this.onSubmit} />
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}
