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
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import AuthRoute from './component/authRoute/authRoute'
import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard.js'
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
          {/* 
            React router按正则匹配的
            Switch下面的path只要命中了一个就会直接渲染,
            没加Switch的话,所以页面都会显示dashboard,因为dashboard没有对应的path
            在switch下,如果没有匹配到对应路由
            则会显示Dashboard组件
          */}
          <Switch>
            <Route path="/bossinfo" component={BossInfo}></Route>
            <Route path="/geniusinfo" component={GeniusInfo}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route component={Dashboard}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('root')
)
