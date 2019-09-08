import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import reducers from './reducer'
import thunk from 'redux-thunk'
import './config'
import Login from './Container/Login/Login'
import Regist from './Container/Register/Regist'
import BossInfo from './Container/BossInfo/BossInfo'
import GeniusInfo from './Container/GeniusInfo/GeniusInfo'
import AuthRouter from './Component/AuthRouter/AuthRouter'
import Dashbord from './Component/Dashbord/Dashbord'
import Chat from './Component/Chat'

// ? thunk中间件
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

// boss genius me msg 4个页面
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <AuthRouter />
            <Switch>
              <Route path="/bossinfo" component={BossInfo}></Route>
              <Route path="/geniusinfo" component={GeniusInfo}></Route>
              <Route path="/login" component={Login}></Route>
              <Route path="/regist" component={Regist}></Route>
              <Route path="/chat/:user" component={Chat}></Route>
              {/* 如果没有path，直接展示component */}
              <Route component={Dashbord}></Route>
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}
export default App
