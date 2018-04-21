import React, { Component } from 'react'
import PropTypes from 'prop-types'

// 负责链接组件，给到redux里的数据放到组件的属性里
// 1.负责接收一个组件，把state里的数据放进去，返回一个组件
// 2.数据变化的时候，能够通知组件
export const connect = (
  mapStateToProps = state => state, 
  mapDispatchToProps = {}
) => {
  
}

// Provider，把store放到context里，所有的子元素可以直接取到store
// 在全局只定义一次
export class Provider extends Component {
  static childContextTypes = {
    store: PropTypes.object
  }

  constructor (props, context) {
    super(props, context)
    this.store = props.store
  }

  getChildContext () {
    return {store: this.store}
  }

  render () {
    return this.props.children
  }
}
