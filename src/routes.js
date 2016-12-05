import React from 'react'
import { Icon } from 'react-native-elements'
import Alarm from './scenes/Alarm'
import Video from './scenes/Video'
import Settings from './scenes/Settings'
import About from './scenes/About'

const routes = {
  alarm: {
    initialRoute: true,
    title: 'Alarm',
    iconProps: {
      name: 'alarm',
    },
    Component: Alarm,
  },
  video: {
    initialRoute: false,
    title: 'Video',
    iconProps: {
      name: 'video-library',
    },
    Component: Video,
  },
  settings: {
    initialRoute: false,
    title: 'Settings',
    iconProps: {
      name: 'settings',
    },
    Component: Settings,
  },
  about: {
    initialRoute: false,
    title: 'About',
    iconProps: {
      name: 'info',
      type: 'octicon',
    },
    Component: About,
  },
}

const routeKeys = Object.keys(routes)

export default routes
export { routeKeys }
