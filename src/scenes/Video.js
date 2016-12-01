import React, { Component, PropTypes } from 'react'
import { View, Button } from 'react-native'
import { connect } from 'react-redux'
import { VideoPlayer } from '../components'
import { getVideoState } from '../store/selectors'
import { createVideoPlayerLoadEnd } from '../store/navigation/actions'

const styles = {
  container: {
    flex: 1,
  },
  buttonContainer: {
    padding: 10,
    height: 200,
    justifyContent: 'space-around',
  },
}


class Video extends Component {
  static propTypes = {
    isVideoActive: PropTypes.bool.isRequired,
    autoplay: PropTypes.bool.isRequired,
    reload: PropTypes.bool.isRequired,
    volume: PropTypes.number.isRequired,
    playRandom: PropTypes.number.isRequired,
    playCustomVideoId: PropTypes.string.isRequired,
  }

  onSnooze = () => {
  }

  onLoadEnd = () => {
    // eslint-disable-next-line
    this.props.dispatchVideoPlayerLoadEnd()
  }

  render() {
    const { reload, autoplay, volume, playCustomVideoId, playRandom, isVideoActive } = this.props
    return (
      <View style={styles.container}>
        {
          isVideoActive &&
          <VideoPlayer
            onLoadEnd={this.onLoadEnd}
            reload={reload}
            autoplay={autoplay}
            volume={volume}
            customVideoId={playRandom ? 'WU54WpQNYic' : playCustomVideoId}
          />
        }
        <Button
          title="Snooze"
          onPress={this.onSnooze}
        />
      </View>
    )
  }
}

const mapStateToProps = state => getVideoState(state)

const mapDispatchToProps = dispatch => ({
  dispatchVideoPlayerLoadEnd: () => dispatch(createVideoPlayerLoadEnd()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Video)
