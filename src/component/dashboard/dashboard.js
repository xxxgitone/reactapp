import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import { Switch, Route } from 'react-router-dom'
import NavLinkBar from '../../component/navlink/navlink'
import Boss from '../../component/boss/boss'

function Genius () {
  return <h2>Genius</h2>
}

function Msg () {
  return <h2>Msg</h2>
}

function User () {
  return <h2>个人中心</h2>
}

@connect(
  state => state
)
class Dashboard extends Component {

  render () {
    const { pathname } = this.props.location
    const { user } = this.props
    const navList = [
      {
        path: '/boss',
        text: '牛人', // 牛人要看到boss的列表
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'Boss', // boss要看到牛人的列表
        icon: 'job',
        title: 'Boss列表',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我的',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    return (
      <div>
        <NavBar className="fixed-header" mode="dard">{navList.find(v => v.path === pathname).title}</NavBar>
        <div style={{marginTop: 45}}>
          <Switch>
            {
              navList.map(v => (
                <Route key={v.path} path={v.path} component={v.component}></Route>
              ))
            }
          </Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}

export default Dashboard
