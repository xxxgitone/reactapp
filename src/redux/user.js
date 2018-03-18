import axios from 'axios'
import { getRedirectPath } from '../util'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
  redirectTo: '',
  isAuth: '',
  msg: '',
  user: '',
  pwd: '',
  type: ''
}

// reducer
export const user = (state = initState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        msg: '', 
        isAuth: true,
        redirectTo: getRedirectPath(action.payload),
        ...action.payload
      }
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg}
    default:
      return state
  }
}

// action creator
function errorMsg (msg) {
  return {msg, type: ERROR_MSG}
}

function registerSuccess (data) {
  return {type: REGISTER_SUCCESS, payload: data}
}

export const register = ({user, pwd, repeatpwd, type}) => {
  if (!user || !pwd || !type) {
    return errorMsg('用户名和密码必须输入')
  }
  if (pwd !== repeatpwd) {
    return errorMsg('密码和确认密码不同')
  }
  return dispatch => {
    axios.post('/user/register', {user, pwd, type})
      .then(res => {
        if (res.data.code === 0) {
          dispatch(registerSuccess({user, pwd, type}))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

