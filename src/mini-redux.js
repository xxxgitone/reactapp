export function createStore(reducer) {
  let currentState = {}
  let currentListeners = []

  function getState () {
    return currentState
  }

  function subscribe (listener) {
    currentListeners.push(listener)
  }

  function dispatch (action) {
    currentState = reducer(currentState, action)
    currentListeners.forEach(func => func())
    return action
  }

  // 初始化
  dispatch({type: '@@MINI/INIT'})
  return {
    getState,
    subscribe,
    dispatch
  }
}