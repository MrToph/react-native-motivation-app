import React, { Component, PropTypes } from 'react'
import { View, Button } from 'react-native'
import { connect } from 'react-redux'
import { VideoPlayer } from '../components'
import { getVideoState } from '../store/selectors'
import { createVideoPlayerLoadEnd, createVideoPlayerError } from '../store/navigation/actions'
import { createSnoozePressed } from '../store/alarm/actions'
import { primaryColor } from '../styling'

const styles = {
  container: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  buttonContainer: {
    // margin: 0,
    // padding: 0,
  },
}

class Video extends Component {
  static propTypes = {
    isVideoActive: PropTypes.bool.isRequired,
    autoplay: PropTypes.bool.isRequired,
    reload: PropTypes.bool.isRequired,
    playRandom: PropTypes.bool.isRequired,
    playCustomVideoId: PropTypes.string.isRequired,
  }

  onSnooze = () => {
    // eslint-disable-next-line
    this.props.dispatchSnoozePressed()
  }

  onError = (error, wasAutoplay) => {
    // eslint-disable-next-line
    this.props.dispatchVideoPlayerError(error, wasAutoplay)
  }

  onLoadEnd = () => {
    // eslint-disable-next-line
    this.props.dispatchVideoPlayerLoadEnd()
  }

  render() {
    const { reload, autoplay, playCustomVideoId, playRandom, isVideoActive } = this.props
    return (
      <View style={styles.container}>
        {
          isVideoActive &&
          <VideoPlayer
            onLoadEnd={this.onLoadEnd}
            onError={this.onError}
            reload={reload}
            autoplay={autoplay}
            customVideoId={playRandom ? '' : playCustomVideoId}
          />
        }
        <Button
          title="Snooze"
          large
          style={styles.buttonContainer}
          color={primaryColor}
          onPress={this.onSnooze}
        />
      </View>
    )
  }
}


const mapStateToProps = state => getVideoState(state)

const mapDispatchToProps = dispatch => ({
  dispatchVideoPlayerLoadEnd: () => dispatch(createVideoPlayerLoadEnd()),
  dispatchSnoozePressed: () => dispatch(createSnoozePressed()),
  dispatchVideoPlayerError: (error, wasAutoplay) => dispatch(createVideoPlayerError(error, wasAutoplay)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Video)
