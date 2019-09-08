import axios from "axios"
import { getRedirectPath } from '../util'
const AUTH_SUCCESS = "AUTH_SUCCESS"
const REGIST_SUCCESS = 'REGIST_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'
const LOGOUT = 'LOGOUT'
const initState = {
    isAuth: false,
    msg: '',
    user: '',
    type: '',
    redirectTo: ''
}
//reducer
export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return { ...state, ...action.payload, msg: '', isAuth: true, redirectTo: getRedirectPath(action.payload) }
        case REGIST_SUCCESS:
            return { ...state, isAuth: true, ...action.payload, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload }
        case ERROR_MSG:
            return { ...state, isAuth: false, msg: action.msg }
        case LOGIN_SUCCESS:
            return { ...state, isAuth: true, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload }
        case LOAD_DATA:
            return { ...state, ...action.payload }
        case LOGOUT:
            return { ...initState, redirectTo: '/login' }
        default:
            return state
    }
}
function authSuccess(data) {
    return { payload: data, type: AUTH_SUCCESS }
}
function registSuccess(data) {
    return { payload: data, type: REGIST_SUCCESS }
}
function loginSuccess(data) {
    return { type: LOGIN_SUCCESS, payload: data }
}
function errorMsg(msg) {
    return { msg, type: ERROR_MSG }
}
export function update(data) {
    return dispatch => {
        axios.post('/user/update', data).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
export function regist({ user, password, repeatPassword, type }) {
    if (!user || !password || !type) {
        return errorMsg('用户名密码必须输入!')
    }
    if (password !== repeatPassword) {
        return errorMsg('密码和确认密码不同!')
    }
    return dispatch => {
        axios.post('/user/regist', {
            user,
            password,
            type
        }).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(registSuccess({ user, password, type }))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        }).catch(e => console.log(e))
    }
}
// async + await
export function login(data) {
    const { user, password } = data
    if (!user || !password) {
        return errorMsg('用户名和密码必填')
    }
    return async dispatch => {
        const res = await axios.post('/user/login', data)
        if (res.status === 200 && res.data.code === 0) {
            dispatch(loginSuccess(res.data.data))
        } else {
            dispatch(errorMsg(res.data.msg))
        }
    }
}
export function loadData(userinfo) {
    return { type: LOAD_DATA, payload: userinfo }
}
export function logoutSubmit() {
    return { type: LOGOUT }
}