const ADD_COUNT = 'ADD_COUNT'
const MINS_COUNT = 'MINS_COUNT'

// 通过reducer建立
// 根据老的状态和action,生成新的state
export function counter (state = 0, action) {
  switch (action.type) {
    case ADD_COUNT:
      return state + 1
    case MINS_COUNT:
      return state - 1
    default:
      return 0
  }
}

// action creator
export function addCount () {
  return {type: ADD_COUNT}
}

export function minsCount () {
  return {type: MINS_COUNT}
}

export function addCountAsync () {
  return dispatch => {
    setTimeout(() => {
      dispatch(addCount())
    }, 2000)
  }
}
