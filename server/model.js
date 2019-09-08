
const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/job'
mongoose.connect(DB_URL,{ useNewUrlParser: true })
const models = [
    {
        key: 'user',
        value: {
            user: { type: String, require: true },
            password: { type: String, require: true },
            type: { type: String, require: true },
            // 图像
            avatar: { type: String },
            // 个人简介或者职位简介
            desc: { type: String },
            title: { type: String },
            // for boss
            company: { type: String },
            money: { type: String }
        }
    },
    {
        key:'chat',
        value: {
            // 聊天
            'chatid': { type: String, require: true },
            'from': { type: String, require: true },
            'to': { type: String, require: true },
            'read': {type: Boolean, default: false},
            'content': { type: String, require: true, default: '' },
            'create_time': { type: Number, default: new Date().getTime() },
        }
    }
]
models.map(item => {
    mongoose.model(item.key, new mongoose.Schema(item.value))
})
module.exports = {
    getModel(name){
        return mongoose.model(name)
    }
}
                    // mongoose.connection.on('connected', () => {
                    //     console.log('mongodb connect success')
                    // })
// 链接mongodb 并且使用react这个集合

// 类似于mysql的表，mongo里有文档、字段的概念
// const User = mongoose.model('user', new mongoose.Schema({
//     name: {type: String, required: true},
//     age: {type:Number,required: true}
// }))

// 删除数据
// User.remove({age: 21}, (err,doc) => {
//     console.log(doc)
// })
// 新增数据
// User.create({
//     name: 'll',
//     age: 22,
// }, (err,doc) => {
//     if(!err){
//         console.log(doc, 'mongodb data')
//     }else {
//         console.log(err)
//     }
// })
// 更新数据
// User.update({user: 'zouzou'},{'$set':{age: 26}},(err, doc) => {
//     console.log(doc, 'doc')
// })