import React from 'react'
import ReactDOM from 'react-dom'
// applyMiddleware处理中间件
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'
// 处理异步
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import AuthRoute from './component/authRoute/authRoute'
import Login from './container/login/login'
import Register from './container/register/register'
import reducers from './reducer'
import './config'
import './index.css'

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  // redux调试工具
  window.devToolsExtension 
    ? window.devToolsExtension()
    : f => f
))

ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <AuthRoute></AuthRoute>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route> 
        </div>
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('root')
)
