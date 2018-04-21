import { createStore } from './mini-redux'

// reducer处理函数
function counter (state = 0, action) {
  switch (action.type) {
    case 'COUNT_ADD':
      return state + 1
    case 'COUNT_MIN':
      return state - 1
    default:
      return 5
  }
}

// 创建store, 参数为reducer
const store = createStore(counter)

// 获取初始状态
const init = store.getState()
console.log(`初始数值为${init}`)

// 监听函数
function listener () {
  const current = store.getState()
  console.log(`当前值为${current}`)
}

// 订阅，每次state变化都会出发
store.subscribe(listener)

// 提交变更的申请
store.dispatch({type: 'COUNT_ADD'})
store.dispatch({type: 'COUNT_ADD'})
store.dispatch({type: 'COUNT_MIN'})
store.dispatch({type: 'COUNT_MIN'})
store.dispatch({type: 'COUNT_ADD'})

