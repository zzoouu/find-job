import React from 'react'
import PropTypes from 'prop-types'
import { Card, WingBlank, WhiteSpace} from 'antd-mobile'
import { connect } from 'react-redux'
import { withRouter} from 'react-router-dom'

@connect(
    state => state.chatUser
)
@withRouter
class UserCard extends React.Component {
    static propTypes = {
        userList: PropTypes.array.isRequired
    }
    handleClick = v => () => {
        this.props.history.push(`/chat/${v._id}`)
    }
    render() {
        const Header = Card.Header
        const Body = Card.Body
        return (
            <WingBlank>
                <WhiteSpace></WhiteSpace>
                {
                    this.props.userlist.map(v => (
                        v.avatar && (
                            <Card
                             key= {v._id}
                             onClick={this.handleClick(v)}
                             >
                                <Header
                                    title={v.user}
                                    thumb={require(`../img/${v.avatar}.png`)}
                                    extra={<span>{v.title}</span>}
                                ></Header>
                                <Body>
                                    {
                                        v.type === 'boss' && <div>公司：{v.company}</div>
                                    }
                                    {
                                        v.desc.split('\n').map(desc => (
                                            <div key={Math.random()}>{desc}</div>
                                        ))
                                    }
                                    {
                                        v.type === 'boss' && <div>薪资：{v.money}</div>
                                    }
                                </Body>
                            </Card>
                        )
                    ))
                }
            </WingBlank>
        )
    }
}
export default UserCard