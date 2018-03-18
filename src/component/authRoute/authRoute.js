import React, { Component } from 'react'
import axios from 'axios'
// 默认情况下只有Route的组件才有history下面的路由信息
// 使用 `withRouter`可以提供history路由信息
import { withRouter } from 'react-router-dom'

@withRouter
class AuthRoute extends Component {
  componentDidMount () {
    const publicList = ['/login', '/register']
    const { pathname } = this.props.location
    if (publicList.indexOf(pathname) > -1) {
      return false
    }
    // 获取用户信息
    axios.get('/user/info').then(res => {
      if (res.data.code === 0) {
        // 有登录信息
      } else {
        this.props.history.push('/login')
      }
    })
    // 是否登录
    // 现在的url地址,login不需要跳转
    // 用户的type,身份是boss还是牛人
    // 用户信息是否完善
  }

  render () {
    return null
  }
}

export default AuthRoute