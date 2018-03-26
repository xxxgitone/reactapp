import axios from 'axios'

const USER_LIST = 'USER_LIST'

const initState = {
  userList: []
}

// reducer
export const chatUser = (state=initState, action) => {
  switch (action.type) {
    case USER_LIST:
      return {...state, userList: action.payload}
    default:
      return state
  }
}

function userList (data) {
  return {type: USER_LIST, payload: data}
}

// action
export const getUserList = (type) => {
  return dispatch => {
    axios.get(`/user/list?type=${type}`)
      .then(res => {
        if (res.data.code === 0) {
          dispatch(userList(res.data.data))
        }
      })
  }
}