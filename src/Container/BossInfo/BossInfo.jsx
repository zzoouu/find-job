import React from 'react'
import { NavBar, InputItem, Button, TextareaItem, Grid } from 'antd-mobile'
import { bossIcons, bossItem } from '../../cosnt'
import { connect } from 'react-redux'
import { update } from '../../Redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
    state => state.user,
    { update }
)
class BossInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    handleInput = (type, value) => {
        this.setState({
            [type]: value
        }, () => {
        })
    }
    render() {
        // img直接src引入无效，需要require
        bossIcons.map(item => item.icon = require(`../../img/${item.text}.png`))
        return (
            <div>
                <NavBar
                    mode="dark"
                    >
                    Boss完善信息页面
                </NavBar>
                    {
                        this.props.redirectTo &&
                        (
                            <Redirect to={this.props.redirectTo}></Redirect>
                        )
                    }
                {
                    this.state.avatar ?
                        (
                            <>
                                <span>name</span>
                                <img src={require(`../../img/${this.state.avatar}.png`)} alt="头像" />
                            </>
                        ) :
                        <p>请选择头像</p>
                }
                <Grid
                    data={bossIcons}
                    columnNum={5}
                    onClick={e => this.handleInput('avatar', e.text)}
                />
                {
                    bossItem.map(item => {
                        return (
                            <InputItem
                                key={item.key}
                                onChange={e => this.handleInput(item.key, e)}
                            >
                                {item.label}
                            </InputItem>
                        )
                    })
                }

                <TextareaItem title="职位要求" rows="5" onChange={e => this.handleInput('desc', e)} />
                <Button
                onClick={() => this.props.update(this.state)}
                type="primary">保存</Button>
            </div>
        )
    }
}
export default BossInfo