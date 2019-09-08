import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

// const TabbarItem = TabBar.Item
@withRouter
@connect(
    state => state.chat
)
class NavLinkBar extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    }
    handleChange = item => {
        this.props.history.push(item.path)
    }
    render() {
        const {
            data,
            location: {
                pathname
            }
        } = this.props
        return (
            <TabBar tabBarPosition="bottom">
                {
                    data.filter(v => !v.hide).map(item => {
                        return (
                            <TabBar.Item
                                badge={ item.path === '/msg' && this.props.unread}
                                title={item.text}
                                key={item.path}
                                icon={{ uri: require(`../../img/${item.icon}.png`) }}
                                selectedIcon={{ uri: require(`../../img/${item.icon}-active.png`) }}
                                selected={item.path === pathname}
                                onPress={() => this.handleChange(item)}
                            />
                        )
                    })
                }
            </TabBar>
        )
    }
}
export default NavLinkBar