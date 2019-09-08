import React from 'react'
// import { WhiteSpace } from 'antd-mobile'
import logo from './logo.jpeg'
import './logo.less'

class Logo extends React.Component {
    render() {
        return (
            <div className="logo-container">
                <img src={logo} alt="" />
            </div>
        )
    }
}
export default Logo