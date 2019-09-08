const express = require('express')
const utility = require('utility')
const Router = express.Router()
const model = require('./model')
// const md5pwd = require('../src/util').md5pwd
const User = model.getModel('user')
const Chat = model.getModel('chat')
const _filter = {
    password: 0,
    _v: 0
}
function md5pwd(password) {
    // 两层md5
    const prefix = 'zouzou_id_beautiful_zxcvbnm@all-'
    return utility.md5(utility.md5(`${prefix}${password}`))
}
function getCookie(req, name) {
    const cookies = req.headers.cookie.split(';').map(item => {
        const key = item.split('=')[0].trim()
        const value = decodeURIComponent(item.split('=')[1].trim()).split(':')[1]
        return {
            [key]: value
        }
    })
    const value = cookies.filter(item => Object.entries(item)[0][0] === name)[0]
    return value[name].replace(/"/g, '')
}
Router.get('/getmsglist', (req, res) => {
    const user = getCookie(req, 'userid')
    // '$or': [{from: user, to: user}]
    User.find({}, (e, userdoc) => {
        let users = {}
        userdoc.forEach(item => {
            users[item._id] = { name: item.user, avatar: item.avatar }
        })
        Chat.find({ '$or': [{ from: user }, { to: user }] }, (err, doc) => {
            if (!err) {
                return res.json({ code: 0, msgs: doc, users: users })
            }
        })
    })

})
Router.get('/list', (req, res) => {
    // User.remove({}, (e, d) => null)
    // get的参数用query,post的参数用body获取
    const { type } = req.query
    const payload = type ? { type } : {}
    User.find(payload, (err, doc) => {
        return res.json({ code: 0, data: doc })
    })
})
Router.post('/regist', (req, res) => {
    const {
        user,
        password,
        type
    } = req.body
    User.find({ user }, (err, doc) => {
        if ((Array.isArray(doc) && doc.length > 0)) {
            return res.json({ code: 1, msg: '用户名重复,请重新输入!!!' })
        }
        // 加密
        const userModel = new User({ user, password: md5pwd(password), type })
        userModel.save((e, d) => {
            if (e) {
                return res.json({ code: 1, msg: '后端出错了' })
            }
            const { user, type, _id } = d
            res.cookie('userid', _id)
            return res.json({ code: 0, data: { user, type, _id } })
        })
        // User.create({user, password: md5pwd(password), type}, (e,d) => {
        //     if(e){
        //         return res.json({code: 1,msg:'后端出错了'})
        //     }
        //     return res.json({code: 0})
        // })
    })
})
Router.post('/login', (req, res) => {
    const { user, password } = req.body
    User.findOne({ user, password: md5pwd(password) }, _filter, (e, d) => {
        if (!d) {
            return res.json({ code: 1, msg: '用户名或密码错误，请重新输入' })
        }
        // 设置cookie
        res.cookie('userid', d._id)
        return res.json({ code: 0, data: d })
    })
})
Router.post('/readmsg', (req, res) => {
    const userid = getCookie(req, 'userid')
    const { from } = req.body
    console.log(from)
    Chat.update(
        { from, to: userid }, 
        { '$set': { read: true } }, 
        { 'multi': true }, 
        (e, doc) => {
        console.log(doc)
        if (!e) {
            return res.json({ code: 0 , num: doc.nModified})
        }
        return res.json({ code: 1, msg: '修改失败' })
    })
})
Router.get('/info', (req, res) => {
    // 获取cookie
    // const cookies = req.headers.cookie.split(';').map(item => {
    //     const key = item.split('=')[0].trim()
    //     const value = decodeURIComponent(item.split('=')[1].trim()).split(':')[1]
    //     return {
    //         [key]:value
    //     }
    // })
    // const { userid } = cookies.filter(item => Object.entries(item)[0][0] === 'userid')[0]
    const userid = getCookie(req, 'userid')
    if (!userid) {
        return res.json({ code: 1 })
    }
    User.findOne({ _id: userid }, (e, d) => {
        if (e) {
            return res.json({ code: 1, msg: '后端出错了' })
        }
        return res.json({ code: 0, data: d })
    })
})
Router.post('/update', (req, res) => {
    const userid = getCookie(req, 'userid')
    if (!userid) {
        return res.json({ code: 1 })
    }
    const body = req.body
    User.findByIdAndUpdate(userid, body, (e, d) => {
        const data = Object.assign({}, {
            user: d.user,
            type: d.type
        }, body)
        return res.json({ code: 0, data })
    })
})
module.exports = Router