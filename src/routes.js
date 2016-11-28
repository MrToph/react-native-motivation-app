import Alarm from './scenes/Alarm'
import Video from './scenes/Video'
import Settings from './scenes/Settings'
import About from './scenes/About'

const routes = {
  alarm: {
    initialRoute: true,
    title: 'Alarm',
    iconName: 'alarm',
    Component: Alarm
  },
  video: {
    initialRoute: false,
    title: 'Video',
    iconName: 'alarm',
    Component: Video
  },
  settings: {
    initialRoute: false,
    title: 'Settings',
    iconName: 'alarm',
    Component: Settings
  },
  about: {
    initialRoute: false,
    title: 'About',
    iconName: 'alarm',
    Component: About
  }
}

const routeKeys = Object.keys(routes)

export default routes
export { routeKeys }
