// 合并reducer 并且返回
import { combineReducers } from 'redux'
import { user} from './Redux/user.redux'
import { chatUser } from './Redux/chat.redux'
import { chat } from './Redux/chat.io.redux'
export default combineReducers({user, chatUser, chat})