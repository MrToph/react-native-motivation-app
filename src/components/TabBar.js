import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
// Tabs = TabNavigator
// Tab = TabNavigator.Item
import { Tabs, Tab, Icon } from 'react-native-elements'
import routes, { routeKeys } from '../routes'
import { createTabPress } from '../store/navigation/actions'
// import Badge from '../../node_modules/react-native-tab-navigator/Badge'
import { textColor, primaryColor, dark2 } from '../styling'

const styles = {
  componentBackground: {
    backgroundColor: 'black',
  },
  tabSelected: {
  },
  titleStyle: {
    color: textColor,
  },
  titleSelected: {
    color: primaryColor,
  },
  tabBarHide: {
    height: 0,
  },
  scenesHide: {
    paddingBottom: 0,
  },
}

class TabBar extends React.Component {
  static propTypes = {
    activeScene: PropTypes.string.isRequired,
    hideTabBar: PropTypes.bool,  // eslint-disable-line
  }

  changeTab(selectedTab) {
    // eslint-disable-next-line
    this.props.dispatchTabPress(selectedTab)
  }

  renderTab(routeKey, routeObj) {
    const selectedTab = this.props.activeScene
    const { title, Component, iconProps } = routeObj
    return (
      <Tab
        key={routeKey}
        tabStyle={[{ backgroundColor: dark2 }, selectedTab !== routeKey && styles.tabSelected]}
        titleStyle={[styles.titleStyle]}
        selectedTitleStyle={[styles.titleSelected]}
        selected={selectedTab === routeKey}
        title={selectedTab === routeKey ? title : null}
        renderIcon={() => <Icon color={textColor} size={26} {...iconProps} />}
        renderSelectedIcon={() => <Icon color={primaryColor} size={26} {...iconProps} />}
        onPress={() => this.changeTab(routeKey)}
      >
        <Component style={styles.componentBackground} />
      </Tab>
    )
  }

  render() {
    const { hideTabBar } = this.props
    return (
      <Tabs
        tabBarStyle={hideTabBar && styles.tabBarHide}
        sceneStyle={hideTabBar && styles.scenesHide}
      >
        {
          routeKeys.map(routeKey => this.renderTab(routeKey, routes[routeKey]))
        }
      </Tabs>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchTabPress: tabName => dispatch(createTabPress(tabName)),
})

export default connect(null, mapDispatchToProps)(TabBar)
