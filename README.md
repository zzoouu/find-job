- npm install redux --save
- npm run eject 弹出配置文件，自定义配置webpack
- 扩展pacakge.json里的script字段，扩展npm run命令

### express + mongodb
- express开发web接口
- 非关系型数据库mongdb
- 使用nodejs的mongoose模块链接和操作mongodb

### express
npm install express --save
npm install nodemon -g // 自动更新
 - app.get app.post
 - app.use使用模块
 - res.json res.send res.sendFile响应不同的内容

### mongodb+mobgoose
非关系型数据库
brew install mongodb
npm install mongoose --save
通过mongoose操作mongodb。存储的是json，相对于mysql来说，要易用的多

启动mongodb
brew services start mongodb 一次性
mongod ? mongo
use job 创建或使用数据库
show dbs 展示数据库
db.dropDatabase() 删除当前数据库
<!-- mongod --config /usr/local/etc/mongod.conf 后台启动 -->
http://ddrv.cn/a/261120/

https://www.cnblogs.com/ruankr/p/8215301.html

### antd-mobile 移动端
npm install antd-mobile --save-dev

### redux
- 专注于状态管理，和react解耦
- 单一状态，单项数据流
- 核心概念：store，state，action，reducer

#### redux处理异步，调试
- redux处理异步，需要redux-thunk插件
- npm install redux-devtools-extentions
- 使用react-redux优雅的链接react和redux

npm install redux-thunk --save
启动插件: 
import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
const store = createStore(reducer, applyMiddleware(thunk))

##### 调试。扩展程序
redux devtools

- 新建store时判断window.devToolsExtension
- 使用compose结合thunk和window.devToolsxtension
- 调试窗的redux选项卡，实时看到state
const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))

#### react-redux
- npm install react-redux --save
- 忘记subscribe，记住reducer,action和dispatch
- react-redux提供provider和connect两个接口来链接

1. Provider组件在应用最外层，传入store即可，只用一次
2. connect负责从外部获取组件需要的参数
3. connect可以用装饰器的方式来写(@)
App = connect()(App)
@connect(
    第一个参数：你要state里的什么属性放到props里面,
    第二个参数：你要什么方法放到props里面，自动dispatch
)

使用装饰器优化connect代码
- npm run eject弹出个性化配置
- npm install babel-plugin-transform-decorators-legacy插件 --save-dev
- package.json里babel加上plugins配置
"babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      "transform-decorators-legacy"
    ]
  },

*更新*
rror: The ‘decorators’ plugin requires a ‘decoratorsBeforeExport’ option, whose value must be a boolean. If you are migrating from Babylon/Babel 6 or want to use the old decorators proposal, you should use the ‘decorators-legacy’ plugin instead of ‘decorators’.
cnpm install babel-plugin-transform-decorators-legacy  --save-dev
cnpm install  @babel/plugin-proposal-decorators --save-dev

"plugins": [
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
      ["@babel/plugin-proposal-class-properties", { "loose" : true }]

### react-router
- npm install react-router-dom --save
- 使用react-router-dom作为浏览器端的路由

入门组件
- BrowserRouter，包裹整个应用
- Router路由对应渲染的组件，可嵌套
- Link跳转专用 exact完全匹配
<Link to='/'></Link>
<Route path='/' exact component={}></Route>

其他组件
- url参数，Route组件参数可用冒号标识参数
<Route path='/:id' exact component={}></Route>
this.props: history,match,location
- Redirect组件跳转
<Redirect to='/'></Redirect>
- Switch只渲染一个子Route组件
<Switch>...
</Switch>
- 复杂redux应用，多个reducer，用combineReducers合并
import combineReducers from {Redux}
combineReducers({a,b,c})

### 前后端联调
1. 使用axios发送异步请求
  - 端口不一致，使用proxy配置转发
  - axios拦截器，统一loading处理
  - redux使用异步处理，渲染页面
  #### axios
  npm install axios --save
  package.json里加入一行: "proxy": "http://localhost:9093" 把所有请求转发到9093
  import axios from 'axios'
  axios.get('/data').then(res => console.log(res))

  - axios.interceptores设置拦截器，比如全局的loading
  - axios.get,.post发送请求,返回promise对象
  - Redux里获取数据，然后dispatch即可
  拦截请求：
  axios.interceptors.request.use(config => {
      加载中。。。
      return config
  })
  拦截响应：
  axios.interceptors.response.use(config => {
      return config
  })


### 页面文件结构
- 组件放在Component文件夹下面
- 页面放在Container文件夹下面
- 也面入口处获取用户信息，决定跳转到哪个页面

### 开发模式
- express依赖cookie-parser，需要npm install cookie-parser --save
- cookie类似于一张身份卡，登录后服务器端返回，你带着cookie就可以访问受限资源
- 页cookie的管理浏览器回自动处理

### 开发流程
1. 页面加载页面 -> 带cookie向后端获取用户信息 -> 用户加载页面
2. 若已经登录 -> app内部页面
3. 若未登录 -> 登录页面 -> 登录成功，前端存储cookie -> APP内部页面


### package.json
babel-pludin-import 按需加载
"babel": {
    "plugins": [
        [
            "import",
            {
                "libraryName": "antd-mobile",
                "style": "css"
            }
        ],
        "transform-decorators-legacy"
    ]
},
"proxy": "http://localhost:9093"

cookie-parser
redux 
redux-thunk

### less
npm install less less-loader --save-dev

npm install body-parser --save


报错:DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect
结果:超时，网站无法访问
解决: 
mongoose.connect(uel,{ useNewUrlParser: true })

### 加密
md5
npm install utility --save
npm install prop-types --save

### phpMyadmin


### 迷你redux
```
function createStore(reducer){
    let currentState = {}
    let currentListener = []

    function getState(){
        return currentState
    }
    function subscribe(listener){
        currentListener.push(listener)
    }
    function dispatch(action){
        currentState = reducer(currentState, action)
        currentListener.forEach(v => v())
        return action
    }
    dispatch({type:'@redux/redux-init'})
    return { getState, subscribe, dispatch }
}
```

### eslint 规范 airbnb

### ant-motion
1. 购买域名
2. DNS解析到你的服务器的IP
3. 安装nginx
4. 使用pm2 管理node 进程
