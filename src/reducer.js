import { combineReducers } from 'redux'
import { user } from './redux/user'

// 合并多个reducer
export default combineReducers({user})