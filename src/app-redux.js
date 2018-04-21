const ADD_COUNT = 'ADD_COUNT'
const MIN_COUNT = 'MIN_COUNT'

export const counter = (state = 0, action) => {
  switch(action.type) {
    case 'ADD_COUNT':
      return state + 1
    case 'MIN_COUNT':
      return state - 1
    default:
      return 5
  }
}

export function addCount () {
  return {type: ADD_COUNT}
}

export function minCount () {
  return {type: MIN_COUNT}
}

export function asyncAdd () {
  return dispatch => {
    setTimeout(() => {
      dispatch({type: ADD_COUNT})
    }, 2000)
  }
}
