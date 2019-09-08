import React from 'react'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { navList } from '../../cosnt'
import NavLinkBar from '../NavLinkBar/NavLinkBar'
import Boss from '../Boss'
import Genius from '../Genius'
import User from '../User'
import Msg from '../Msg'
import { getMsgList, sendMsg, recvMsg } from '../../Redux/chat.io.redux'
import '../../index.less'


@connect(
    state => state,
    { getMsgList, sendMsg, recvMsg }
)
class Dashbord extends React.Component {
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
    render() {
        const pathname = this.props.location.pathname
        return (
            <>
                <NavBar mode="dark" className="fix-header">
                    {
                        navList(this.props.user, Boss, Genius, Msg, User)
                            .find(nav => nav.path === pathname).title
                    }
                </NavBar>
                <div style={{ marginTop: 45 }}>
                    <Switch>
                        {
                            navList(this.props.user, Boss, Genius, Msg, User)
                                .filter(item => item.path === pathname).map(item => {
                                    return (
                                        <Route key={item.path} to={item.path} component={item.compomnent}></Route>
                                    )
                                })
                        }
                    </Switch>
                </div>
                <NavLinkBar data={navList(this.props.user, Boss, Genius, Msg, User)}></NavLinkBar>
            </>
        )
    }
}
export default Dashbord