export function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer)
  }
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

export function applyMiddleware (...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args)
    let dispatch = store.dispatch

    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }

    const middlewareChain = middlewares.map(middleware => middleware(midApi))
    dispatch = compose(...middlewareChain)(store.dispatch)

    // dispatch = middleware(midApi)(store.dispatch)
    return {
      ...store,
      dispatch
    }
  }
}

// compose(fn1, fn2, fn3)
// fn1(fn2(fn3))
export function compose (...funcs) {
  if (funcs.length === 0) {
    return args => args
  }

  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((ret, cur) => (...args) => ret(cur(...args)))
}

function bindActionCreator (creator, dispatch) {
  return (...args) => dispatch(creator(...args))
}
// creators = {
//   addCount,
//   minCount,
//   asyncAdd
// }
export function bindActionCreators (creators, dispatch) {
  // let bound = {}
  // Object.keys(creators).forEach(v => {
  //   let creator = creators[v]
  //   bound[v] = bindActionCreator(creator, dispatch)
  // })
  // return bound
  return Object.keys(creators).reduce((ret, cur) => {
    ret[cur] = bindActionCreator(creators[cur], dispatch)
    return ret
  }, {})
}
