const utility = require('utility')
export function getRedirectPath(payload){
    const { type, avatar } = payload
    let url = (type === 'boss') ? '/boss' : '/genius'
    if(!avatar){
        // 用户信息已经完善
        url += 'info'
    }
    return url
}
export function md5pwd(password){
    // 两层md5
    const prefix = 'zouzou_id_beautiful_zxcvbnm@all-'
    return utility.md5(utility.md5(`${prefix}${password}`))
}
export function getChatId(userId, targetId){
    return [userId, targetId ].sort().join('_')
}