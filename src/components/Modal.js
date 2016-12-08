import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, Modal } from 'react-native'
import { Button, COLOR, TYPO } from 'react-native-material-design'
import { Text } from '../components'
import primary from '../styling'

export default class MyModal extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func,
    onBack: PropTypes.func,
    customStyle: PropTypes.shape({
      modalContainer: PropTypes.object,
      innerContainer: PropTypes.object,
      buttonContainer: PropTypes.object
    })
  }

  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
    this.onBack = this.onBack.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onRequestClose = this.onRequestClose.bind(this)
  }

  render () {
    if (this.props.customStyle) {
      var { modalContainer, innerContainer, buttonContainer } = this.props.customStyle
    }
    return (
        <Modal
          animationType={"slide"}
          transparent
          visible={this.props.visible}
          onRequestClose={this.onRequestClose}>
          <View style={[styles.modalContainer, modalContainer]}>
            <View style={[styles.innerContainer, innerContainer]}>
              <Text style={[TYPO.paperFontSubhead, COLOR[primary + '500']]}>
                {this.props.title}
              </Text>
              {this.props.children}
              <View style={[styles.buttonContainer, buttonContainer]}>
                <Button primary={primary} text={'Back'} onPress={this.onBack} />
                <Button primary={primary} text={'OK'} onPress={this.onSubmit} />
              </View>
            </View>
          </View>
        </Modal>
    )
  }

  // gets called on back button of phone
  onRequestClose () {
    // alert('onRequestClose called')
    this.onBack()
  }

  onBack () {
    if (this.props.onBack) this.props.onBack()
  }

  onSubmit () {
    if (this.props.onSubmit) this.props.onSubmit()
  }
}

const styles = StyleSheet.create({
  modalContainer: { // spans the WHOLE page. used to set the only inner item to the vertical middle
    flex: 1,  // span over whole page
    alignItems: 'stretch', // horizontal center it
    justifyContent: 'center', // vertical center content
    padding: 20,  // so inner content is not full width
    backgroundColor: 'rgba(0,0,0,0.5)'  // darkened background
  },
  innerContainer: {
    flexDirection: 'column',
    backgroundColor: '#fff',  // white background
    borderRadius: 10, // rounded corners
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})
