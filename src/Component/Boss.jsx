import React from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../Redux/chat.redux'
import UserCard from './UserCard'

@connect(
    state => state.chatUser,
    { getUserList }
)
class Boss extends React.Component {
    componentWillMount() {
        this.props.getUserList('genius')
    }
    render() {
        return <UserCard userlist={this.props.userlist}></UserCard>
    }
}
export default Boss