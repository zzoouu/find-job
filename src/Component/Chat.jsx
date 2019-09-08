import React from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg, readMsg } from '../Redux/chat.io.redux'
import { getChatId } from '../util'
import { emoji } from '../cosnt'
const LItem = List.Item

@connect(
    state => state,
    { getMsgList, sendMsg, recvMsg, readMsg }
)
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            showEmoji: false
        }
    }
    componentDidMount() {
        // websocket 非http
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
        this.fixCarousel()
    }
    componentWillUnmount(){
        const to = this.props.match.params.user
        this.props.readMsg(to)
    }
    handleChange = v => {
        this.setState({
            text: v
        })
    }
    handleSubmit = () => {
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({ from, to, msg })
        this.setState({
            text: '',
            showEmoji: false
        })
    }
    handleBack = () => {
        this.props.history.goBack()
    }
    showEmoji = () => {
        this.setState({
            showEmoji: !this.state.showEmoji
        })
        this.fixCarousel()
    }
    fixCarousel = () => {
        setTimeout(function(){
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }
    render() {
        const userid = this.props.match.params.user
        const users = this.props.chat.users
        const chatid = getChatId(userid, this.props.user._id)
        const chatmsg = this.props.chat.chatmsg.filter(v => v.chatid === chatid)
        const emojis = emoji.split(' ').filter(v => v).map(item => ({ text: item }))
        // if(users[userid]) return null
        return (
            <div id="chat-page">
                <NavBar
                    mode="dark"
                    leftContent={<Icon type="left" />}
                    onLeftClick={this.handleBack}
                >
                    {users[userid] && users[userid].name}
                </NavBar>
                {
                    chatmsg.map(v => {
                        const avatar = users[v.from] && require(`../img/${users[v.from].avatar}.png`)
                        return v.from === userid ? (
                            <List key={v._id}>
                                <LItem
                                    thumb={avatar}
                                >{v.content}</LItem>
                            </List>
                        ) : (
                                <List key={v._id}>
                                    <LItem
                                        extra={<img src={avatar} alt="头像" />}
                                        className="chat-me"
                                    >
                                        {v.content}
                                    </LItem>
                                </List>
                            )
                    })
                }
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="请输入"
                            value={this.state.text}
                            onChange={v => this.handleChange(v)}
                            extra={
                                <div>
                                    <span
                                        style={{ marginRight: 10 }}
                                        onClick={this.showEmoji}
                                    >😀</span>
                                    <span onClick={this.handleSubmit}>发送</span>
                                </div>
                            }
                        >
                            信息
                        </InputItem>
                    </List>
                    {
                        this.state.showEmoji &&
                        <Grid
                            data={emojis}
                            columnNum={9}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={ el => this.setState({ text: this.state.text + el.text})}
                        />
                    }
                </div>
            </div>
        )
    }
}
export default Chat