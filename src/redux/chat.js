import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9000')

const MSG_LIST = 'MSG_LIST'
const MSG_RECV = 'MSG_RECV'
const MSG_READ = 'MSG_READ'

const initState = {
  chatmsg: [],
  users: {},
  unread: 0
}

export const chat = (state = initState, action) => {
  switch (action.type) {
    case MSG_LIST:
      return {
        ...state,
        chatmsg: action.payload.msgs,
        users: action.payload.users,
        unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length
      }
    case MSG_RECV:
      const n = action.payload.msgs.to === action.payload.userid ? 1 : 0
      return {
        ...state,
        chatmsg: [...state.chatmsg, action.payload.msgs],
        unread: state.unread + n
      }
    // case MSG_READ:
    default:
      return state
  }
}

function msgList (msgs, users, userid) {
  return {type: MSG_LIST, payload: {msgs, users, userid}}
}

function msgRecv (msgs, userid) {
  return {type: MSG_RECV, payload: {msgs, userid}}
}

export const recvMsg = (msgs) => {
  return (dispatch, getState) => {
    socket.on('recvmsg', (data) => {
      const userid = getState().user._id
      dispatch(msgRecv(data, userid))
    })
  }
}

export const sendMsg = ({from, to, msg}) => {
  return dispatch => {
    socket.emit('sendmsg', {from, to, msg})
  }
}

export const getMsgList = () => {
  return (dispatch, getState) => {
    axios.get('/user/getmsglist')
      .then(res => {
        if (res.data.code === 0) {
          const userid = getState().user._id
          dispatch(msgList(res.data.msgs, res.data.users, userid))
        }
      })
  }
}