import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadData } from '../..//Redux/user.redux'

@withRouter
@connect(
    state => state.user,
    {loadData}
)
class AuthRouter extends React.Component{
    componentDidMount() {
        const publicList = ['/login', 'regits']
        const pathname = this.props.location.pathname
        // ?
        if(publicList.includes(pathname)) return null
        // 获取用户信息
        //是否登录，用户身份现在的url地址
        // 用户是否需要完善信息
        axios.get('/user/info').then(res => {
            if(res.status === 200){
                if(res.data.code === 0){
                    // this.props.history.push('/regist')
                    // 有登录信息
                    this.props.loadData(res.data.data)
                }else {
                    this.props.history.push('/login')
                }
            }
        }) 
    }
    render() {
        return (
            null
        )
    }
}
export default AuthRouter