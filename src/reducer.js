import { combineReducers } from 'redux'
import { user } from './redux/user'
import { chatUser } from './redux/chatUser'

// 合并多个reducer
export default combineReducers({
  user,
  chatUser
})
