import React, { Component, PropTypes } from 'react'
import { WebView, View } from 'react-native'
import { typography } from 'react-native-material-design-styles'
import Text from './Text'
import { dark3 } from '../styling'
import { apiSource } from '../constants'

const styles = {
  webView: {
    flex: 1,
    backgroundColor: dark3,
  },
  errorView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}

export default class VideoPlayer extends Component {
  static propTypes = {
    autoplay: PropTypes.bool.isRequired,
    // render is automatically called when reload changed to true
    reload: PropTypes.bool.isRequired,  // eslint-disable-line
    customVideoId: PropTypes.string.isRequired,    // if defined we should play
    onLoadEnd: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    // a re-render makes the webview load the whole video again, making it start all over.
    const { autoplay, reload, customVideoId, onLoadEnd } = this.props
    if (nextProps.reload) return true // reload is cleared immediately, don't re-render when it's set to false
    if (nextProps.autoplay === autoplay
        && nextProps.customVideoId === customVideoId
        && nextProps.onLoadEnd === onLoadEnd) {
      return false
    }
    return true
  }

  renderError(error) {
    console.log(error)
    return (
      <View style={styles.errorView}>
        <Text style={[{ textAlign: 'center' }, typography.paperFontDisplay1]}>
          {`There was an error playing the video.
          \nMake sure you have a working internet connection.`}
        </Text>
      </View>
    )
  }

  render() {
    const { autoplay, customVideoId } = this.props
    const renderReload = this.props.reload  // only gets updated when render is updated
    const source = {
    // may not be called index.html, bug?
      uri: `${apiSource}?nocache=${Date.now()}&volume=100`
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
        onLoadEnd={this.props.onLoadEnd}
        onError={event => this.props.onError(event.nativeEvent, renderReload)}
        renderError={this.renderError}
      />
    )
  }
}
