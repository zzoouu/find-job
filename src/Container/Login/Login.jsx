import React from 'react'
import { Button, WingBlank, WhiteSpace, InputItem } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Logo from '../../Component/Logo/Logo'
import { login } from '../../Redux/user.redux'
import '../../index.less'
import Forms from '../../Component/Forms'

@connect(
    state => state.user,
    { login }
)
@Forms
class Login extends React.Component {
    handleLogin = () => {
        this.props.login(this.props.state)
    }
    handleLogout = () => {
        this.props.history.push('/regist')
    }
    render() {
        return (
            <div>
                {
                    this.props.redirectTo && this.props.redirectTo !== '/login' &&
                    <Redirect to={this.props.redirectTo}></Redirect>
                }
                <Logo />
                {
                    this.props.msg && 
                    <WingBlank>
                        <p className="error-msg">{this.props.msg}</p>
                    </WingBlank>
                }
                <WingBlank><InputItem onChange={e=> this.props.handleChange('user',e)}>用户名</InputItem></WingBlank><WhiteSpace />
                <WingBlank
                ><InputItem onChange= {e => this.props.handleChange('password', e)}>密码</InputItem></WingBlank><WhiteSpace />
                <WingBlank style={{marginTop: 30}}>
                    <Button type="primary" onClick={this.handleLogin}>登录页面</Button>
                </WingBlank> <WhiteSpace />
                <WingBlank>
                    <Button type="primary" onClick={this.handleLogout}>注册页面</Button>
                </WingBlank><WhiteSpace />
            </div>
        )
    }
}
export default Login