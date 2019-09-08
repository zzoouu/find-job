const express = require('express')
const userRouter = require('./user')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const model = require('./model')
const Chat = model.getModel('chat')
// Chat.remove({}, (err, doc) => {})
// work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on('connection', socket => {
    // socket已经连接
    socket.on('sendmsg', data => {
        const { from, to, msg } = data
        const chatid = [from, to].sort().join('_')
        Chat.create({chatid, from, to, content: msg}, (err, doc) => {
            io.emit('recvmsg', Object.assign({}, doc._doc))
        })
    })
})

app.use(bodyParser.json())
app.use('/user',userRouter)

app.use((req, res, next) => {
    if(req.url.startsWith('/user/') || req.url.startsWith('/static/')){
        return next()
    }else {
        return res.sendFile(path.resolve('build/index.html'))
    }
})
app.use('/', express.static(path.resolve('build')))
server.listen(3344, () => {
    console.log('port is 3344')
})