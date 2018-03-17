import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// applyMiddleware处理中间件
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'
import { counter } from './redux'
// 处理异步
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

const store = createStore(counter, compose(
  applyMiddleware(thunk),
  // redux调试工具
  window.devToolsExtension 
    ? window.devToolsExtension()
    : f => f
))

ReactDOM.render(
  (
    <Provider store={store}>
      <App/>
    </Provider>
  ),
  document.getElementById('root')
)