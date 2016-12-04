import { color } from 'react-native-material-design-styles'

const primary = 'paperRed' // paperDeepPurple500 = #673ab7
const primaryColor = color[`${primary}500`].color
const textColor = color.paperGreen900.color
const textColorOnPrimary = color.paperGrey50.color
const adBannerHeight = 50

const repeatButtonSize = 40

// http://colorbrewer2.org/#type=qualitative&scheme=Paired&n=10
const graphColors = ['#3F51B5', '#a6cee3', '#33a02c', '#b2df8a', '#e31a1c', '#fb9a99', '#ff7f00', '#fdbf6f', '#6a3d9a', '#cab2d6']

export default primary
export {
  primaryColor,
  textColor,
  textColorOnPrimary,
  adBannerHeight,
  graphColors,
  repeatButtonSize,
}
