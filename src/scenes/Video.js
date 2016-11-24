import React, { Component } from 'react'
import { View, Text, WebView } from 'react-native'

const website = `
<html>
  <body>
    <!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
    <div id="player"></div>

    <script>
      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '360',
          width: '640',
          videoId: 'M7lc1UVf-VE',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }
    </script>
  </body>
</html>
`

export default class Video extends Component {
    render() {
        const source = {
            // html: website, 
            uri: 'http://cmichel.io/test/test.html',
            // uri: 'http://www.youtube.com/embed/hbkZrOU1Zag?autoplay=1'
        }
        return (
            <View style={styles.container}>
                <WebView
                    style={styles.webView}
                    javaScriptEnabled
                    injectedJavaScript={``}
                    mediaPlaybackRequiresUserAction={false}
                    allowUniversalAccessFromFileURLs
                    source={source}
                />
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1
    },
    webView: {
        flex: 1,
        alignSelf: 'stretch'
    }
}

// <WebView
//     style={styles.webView}
//     javaScriptEnabled
//     source={{uri: 'https://www.youtube.com/embed/hbkZrOU1Zag?rel=0&autoplay=1&showinfo=0&controls=1&loop=1&vq=small'}}
// />