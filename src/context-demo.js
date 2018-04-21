import React, { Component } from 'react'
import PropTypes from 'prop-types'

// context是全局的，组件里声明，所有子元素可以直接使用
class Sidebar extends Component {
  render () {
    return (
      <div>
        <p>侧边栏</p>
        <Navbar/>
        {/* <Navbar user={this.props.user}/> */}
      </div>
    )
  }
}

// 无状态组件获取context
// function Navbar (props, context) {}

class Navbar extends Component {
  // 要使用上下文类型
  static contextTypes = {
    user: PropTypes.string
  }

  render () {
    return (
      <div>{this.context.user}导航栏</div>
    )
  }
}

class ContextPage extends Component {
  // 设置子组件使用的context类型
  static childContextTypes = {
    user: PropTypes.string
  }

  constructor (props) {
    super(props)
    this.state = {user: 'context'}
  }

  getChildContext () {
    return this.state
  }

  render () {
    // const user = 'context'
    return (
      <div>
        <p>我是{this.state.user}</p>
        <Sidebar/>
        {/* <Sidebar user={user}/> */}
      </div>
    )
  }
}

export default ContextPage
