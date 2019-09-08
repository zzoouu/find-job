import React from 'react'
import { Button, WingBlank, WhiteSpace, InputItem, Radio, List } from 'antd-mobile'
import Logo from '../../Component/Logo/Logo.jsx'
import { connect } from 'react-redux'
import { regist } from '../../Redux/user.redux'
import { withRouter, Redirect } from 'react-router-dom'
import '../../index.less'
import Forms from '../../Component/Forms'

const RadioItem = Radio.RadioItem

@connect(
    state => state.user,
    { regist }
)
@withRouter
@Forms
class Regist extends React.Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         user: '',
    //         password: '',
    //         repeatPassword: '',
    //         type: 'genius',
    //     }
    // }
    componentDidMount(){
        this.props.handleChange('type', 'genius')
    }
    // handleChange = (key, value) => {
    //     // []对象的计算属性，不加【】则为字符串key
    //     this.setState({
    //         [key]: value
    //     }, () => {
    //     })
    // }
    handleRegist = () => {
        this.props.regist(this.props.state)
    }
    render() {
        return (
            <div>
                {this.props.redirectTo && <Redirect to={this.props.redirectTo}></Redirect>}
                <Logo />
                {
                    this.props.msg &&
                    <WingBlank>
                        <p className="error-msg">{this.props.msg}</p>
                    </WingBlank>
                }
                <WingBlank>
                    <List>
                        <WingBlank>
                            <InputItem onChange={e => this.props.handleChange('user', e)}>用户名</InputItem>
                        </WingBlank><WhiteSpace />
                        <WingBlank>
                            <InputItem type="password" onChange={e => this.props.handleChange('password', e)}>密码</InputItem>
                        </WingBlank><WhiteSpace />
                        <WingBlank>
                            <InputItem type="password" onChange={e => this.props.handleChange('repeatPassword', e)}>确认密码</InputItem>
                        </WingBlank><WhiteSpace />
                        {/* 要用List包住RadioItem，否则onChange无效 */}
                        <WingBlank>
                            <RadioItem checked={this.props.state.type === 'genius'} onChange={() => this.props.handleChange('type', 'genius')}>牛人</RadioItem>
                        </WingBlank><WhiteSpace />
                        <WingBlank>
                            <RadioItem checked={this.props.state.type === 'boss'} onChange={() => this.props.handleChange('type', 'boss')}>Boss</RadioItem>
                        </WingBlank><WhiteSpace />
                        <WingBlank style={{ marginTop: 30 }}>
                            <Button type="primary" onClick={this.handleRegist}>注册</Button>
                        </WingBlank>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
export default Regist