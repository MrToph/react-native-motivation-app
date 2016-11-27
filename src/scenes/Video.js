import React, { Component } from 'react'
import { View, Text, WebView, Button } from 'react-native'
import AppLauncher from 'react-native-app-launcher'

export default class Video extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const videoId = 'idyZRfRScbk'
        const volume = '50'
        const source = {
            // html: website, 
            uri: `http://cmichel.io/test/api.html?nocache=${Date.now()}&videoid=${videoId}&volume=${volume}`, // may not be called index.html, bug?
            // uri: 'http://www.youtube.com/embed/hbkZrOU1Zag?autoplay=1'
        }
        console.log(source)
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
                <View style={styles.buttonContainer}>
                    <Button
                    style={styles.button}
                    onPress={this.onPress}
                    title="Start Timer"
                    color="#841584"
                    accessibilityLabel="Start the Alarm Manager timer which launches this app."
                    />
                    <Button
                    style={styles.button}
                    onPress={this.onPress2}
                    title="Start Timer 6 minutes"
                    color="#0000ff"
                    accessibilityLabel="Start the Alarm Manager timer which launches this app."
                    />
                    <Button
                    style={styles.button}
                    onPress={this.onClear}
                    title="Clear"
                    color="#ff0000"
                    />
                </View>
            </View>
        )
    }

    onPress = () => {
        AppLauncher.setAlarm("1", 5, false)
    }

    onPress2 = () => {
        AppLauncher.setAlarm("2", 10, false)
    }

    onClear = () => {
        AppLauncher.clearAlarm("1")
    }
}

const styles = {
    container: {
        flex: 1
    },
    webView: {
    },
    buttonContainer: {
        padding: 10,
        height: 200,
        justifyContent: 'space-around'
    }
}

// <WebView
//     style={styles.webView}
//     javaScriptEnabled
//     source={{uri: 'https://www.youtube.com/embed/hbkZrOU1Zag?rel=0&autoplay=1&showinfo=0&controls=1&loop=1&vq=small'}}
// />