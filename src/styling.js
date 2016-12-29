// Dark Color theme colors: https://material.google.com/style/color.html#color-themes
// https://github.com/PolymerElements/paper-styles/blob/master/color.html
import { color } from 'react-native-material-design-styles'

const primary = 'paperRed' // #f44336
const primaryColor = color[`${primary}500`].color
const textColor = color.paperGrey50.color
const textColorOnPrimary = color.paperGrey50.color
const dark2 = '#212121' // App bar
const dark3 = '#303030' // background
const dark4 = '#424242' // Cards/Dialogs

const adBannerHeight = 50
const repeatButtonSize = 40

// http://colorbrewer2.org/#type=qualitative&scheme=Paired&n=10
const graphColors = ['#3F51B5', '#a6cee3', '#33a02c', '#b2df8a', '#e31a1c', '#fb9a99', '#ff7f00', '#fdbf6f', '#6a3d9a', '#cab2d6']

export default primary
export {
  adBannerHeight,
  dark2,
  dark3,
  dark4,
  graphColors,
  primaryColor,
  repeatButtonSize,
  textColor,
  textColorOnPrimary,
}
