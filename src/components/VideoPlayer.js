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
    // render is automatically called when reload changed to true
    reload: PropTypes.bool.isRequired,  // eslint-disable-line
    customVideoId: PropTypes.string.isRequired,    // if defined we should play
    onLoadEnd: PropTypes.func.isRequired,
  }

  render() {
    const { autoplay, customVideoId } = this.props
    const source = {
    // may not be called index.html, bug?
      uri: `${apiSource}?nocache=${Date.now()}&volume=100`
            + `${autoplay ? `&autoplay=${autoplay}` : ''}`
            + `${customVideoId ? `&videoid=${customVideoId}` : ''}`,
    }
    console.log(source.uri, customVideoId)
    return (
      <WebView
        style={styles.webView}
        ref={(webView) => { this.webView = webView }}
        javaScriptEnabled
        injectedJavaScript={''}
        mediaPlaybackRequiresUserAction={false}
        allowUniversalAccessFromFileURLs
        source={source}
        onLoadEnd={this.props.onLoadEnd}
      />
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { autoplay, reload, customVideoId } = this.props
    if (nextProps.autoplay === autoplay && nextProps.reload === reload && nextProps.customVideoId === customVideoId) {
      return false
    }
    return true
  }
}
