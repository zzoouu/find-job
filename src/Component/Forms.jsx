import React from 'react'

export default function Forms(Comp){
    return class Forms extends React.Component {
        constructor(props){
            super(props)
            this.state = {}
        }
        handleChange = (type, data) => {
            this.setState({
                [type]: data
            })
        }
        render(){
            return (<Comp handleChange={this.handleChange} {...this.props} state={this.state}></Comp>)
        }
    }
}