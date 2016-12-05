import React, { Component, PropTypes } from 'react'
import { WebView } from 'react-native'
import { dark3 } from '../styling'
import { apiSource } from '../constants'

const styles = {
  webView: {
    flex: 1,
    backgroundColor: dark3,
  },
}

export default class VideoPlayer extends Component {
  static propTypes = {
    autoplay: PropTypes.bool.isRequired,
    reload: PropTypes.bool.isRequired,
    volume: PropTypes.number.isRequired,
    customVideoId: PropTypes.string.isRequired,    // if defined we should play
    onLoadEnd: PropTypes.func.isRequired,
  }

  // onMessage = (event) => {
  //   const dataString = event.nativeEvent.data
  //   console.log(dataString)
  // }

  // // my api always returns its whole state
  // postMessage = () => {
  //   if (this.webview) {
  //     this.webview.postMessage('"Hello" from React Native!')
  //   }
  // }

  // is automatically called when reload changed to true
  render() {
    const { autoplay, volume, customVideoId } = this.props
    const source = {
    // may not be called index.html, bug?
      uri: `${apiSource}?nocache=${Date.now()}&volume=${volume}`
            + `${autoplay ? `&autoplay=${autoplay}` : ''}`
            + `${customVideoId ? `&videoid=${customVideoId}` : ''}`,
    }
    // console.log(source.uri, customVideoId)
    return (
      <WebView
        style={styles.webView}
        ref={(webView) => { this.webView = webView }}
        javaScriptEnabled
        injectedJavaScript={''}
        mediaPlaybackRequiresUserAction={false}
        allowUniversalAccessFromFileURLs
        source={source}
        onMessage={this.onMessage}
        onLoadEnd={this.props.onLoadEnd}
      />
    )
  }
}
