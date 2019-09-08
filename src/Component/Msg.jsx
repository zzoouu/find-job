import React from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

const LItem = List.Item
const Brief = LItem.Brief

@connect(
    state => state
)
class Msg extends React.Component {
    getLast = arr => {
        return arr[arr.length - 1]
    }
    render() {
        const { chat: { chatmsg, users: userInfo }, user } = this.props
        const msgGroup = {}
        chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        const chatList = Object.values(msgGroup).sort((a, b) => {
            const a_last = this.getLast(a).create_time
            const b_last = this.getLast(b).create_time
            return b_last - a_last
        })
        const userid = user._id
        return (
            <div>
                {
                    chatList.map(v => {
                        const lastInfo = this.getLast(v)
                        const targetId = lastInfo.from === userid ? lastInfo.to : lastInfo.from
                        const name = userInfo[targetId] && userInfo[targetId].name
                        const avatar = userInfo[targetId] && userInfo[targetId].avatar
                        const unread = v.filter(item => {
                            return (!item.read) && (item.to === userid)
                        }).length
                        return (
                            <List key={lastInfo._id}>
                                <LItem
                                    extra={<Badge text={unread}></Badge>}
                                    thumb={require(`../img/${avatar}.png`)}
                                    arrow="horizontal"
                                    onClick={() => this.props.history.push(`/chat/${targetId}`)}
                                >
                                    {lastInfo.content}
                                    <Brief>{name}</Brief>
                                </LItem>
                            </List>
                        )
                    })
                }
            </div>
        )
    }
}
export default Msg