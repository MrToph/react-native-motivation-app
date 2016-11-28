import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab, Icon } from 'react-native-elements'
import Video from '../scenes/Video'
import routes, { routeKeys } from '../routes'
import { createTabPress } from '../store/navigation/actions'
import Badge from '../../node_modules/react-native-tab-navigator/Badge'

class TabBar extends Component {
    render() {
        return (
            <Tabs>
                {
                    routeKeys.map(routeKey => this.renderTab(routeKey, routes[routeKey]))
                }
            </Tabs>
        )
    }

    renderTab(routeKey, routeObj) {
        const selectedTab = this.props.activeScene
        const { title, Component, iconName } = routeObj
        return (
            <Tab
                key={routeKey}
                tabStyle={selectedTab !== routeKey && styles.tabSelected}
                titleStyle={[styles.titleStyle]}
                selectedTitleStyle={[styles.titleSelected]}
                selected={selectedTab === routeKey}
                title={selectedTab === routeKey ? title : null}
                renderIcon={() => <Icon name={iconName} size={26} />}
                renderSelectedIcon={() => <Icon name={iconName} size={26} />}
                renderBadge={() => <Badge style={styles.tabBarBadge}>3</Badge>}
                onPress={() => this.changeTab(routeKey)}>
                <Component />
            </Tab>
        )
    }

    changeTab(selectedTab) {
        console.log(selectedTab)
        this.props.dispatchTabPress(selectedTab)
    }
}

TabBar.propTypes = {
    activeScene: PropTypes.string.isRequired
}

const styles = {
    tabSelected: {
    }
}

const mapDispatchToProps = dispatch => ({
    dispatchTabPress: tabName => dispatch(createTabPress(tabName))
})

export default connect(null, mapDispatchToProps)(TabBar)
