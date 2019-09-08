import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import browserCookie from 'browser-cookies'
import { logoutSubmit } from '../Redux/user.redux'

const LItem = List.Item
const Brief = List.Item.Brief
const alert = Modal.alert

@connect(
    state => state.user,
    { logoutSubmit }
)
class User extends React.Component{
    handleLogout = () => {
        // 删除从cookie
        alert('注销', '确认退出登录？', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                browserCookie.erase('userid')
                // window.location.href = window.location.href
                this.props.logoutSubmit()
                this.props.history.push('/login')
            }},
          ])
    }
    render() {
        return this.props.user ? (
                <div>
                    <Result
                        img={<img src={require(`../img/${this.props.avatar}.png`)} style={{ width: 50 }} alt="图片" />}
                        title={this.props.user}
                        message={this.props.type === 'boss' && this.props.company}
                        />
                    <List renderHeader={() => '简介'}>
                        <LItem multipleLine>
                        {this.props.title}
                        {this.props.desc.split('\n').map(v => (
                            <Brief key={v}>{v}</Brief>
                        ))}
                        {
                            this.props.money && <Brief>薪资：{this.props.money}</Brief>
                        }
                        </LItem>
                    </List>
                    <p>用户中心</p>
                    <WhiteSpace></WhiteSpace>
                    <List>
                        <LItem onClick={this.handleLogout}>退出登录</LItem>
                    </List>
                </div>
        ) : null
    }
}
export default User