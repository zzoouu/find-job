import React from 'react'
import { NavBar, InputItem, Button, TextareaItem, Grid } from 'antd-mobile'
import { bossIcons, geniusItem } from '../../cosnt'
import { connect } from 'react-redux'
import { update } from '../../Redux/user.redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

@connect(
    state => state.user,
    { update }
)
class GeniusInfo extends React.Component {
    static propTypes = {
        a: PropTypes.func.isRequired
    }
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
                    牛人完善信息页面
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
                    geniusItem.map(item => {
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
export default GeniusInfo