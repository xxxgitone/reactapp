import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from './mini-redux'

// 负责链接组件，给到redux里的数据放到组件的属性里
// 1.负责接收一个组件，把state里的数据放进去，返回一个组件
// 2.数据变化的时候，能够通知组件

// function connect (mapStateToProps, mapDispatchToProps) {
//   return function(WrapComponent) {
//     return class ConnectComponent extends Component {

//     }
//   }
// }
export const connect = (
  mapStateToProps = state => state, 
  mapDispatchToProps = {}
) => (WrapComponent) => {
  return class ConnectComponent extends Component {
    static contextTypes = {
      store: PropTypes.object
    }

    constructor (props, context) {
      super(props, context)
      this.state = {
        props: {}
      }
    }

    componentDidMount () {
      const { store } = this.context
      // 每一次状态变化都要调用update
      store.subscribe(() => this.update())
      this.update()
    }

    update () {
      // 获取mapStateToProps，mapDispatchToProps放入this.props里面
      const { store } = this.context
      const stateProps = mapStateToProps(store.getState())
      // 方法不能直接给，需要dispatch，要执行store.dispatch()才有意义
      // export function addCount () {
      //   return {type: ADD_COUNT}
      // }
      const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch)
      this.setState({
        props: {
          ...this.state.props,
          // 新生成props放在原先的后面，覆盖
          ...stateProps,
          ...dispatchProps
        }
      })
    }

    render () {
      return <WrapComponent {...this.state.props}></WrapComponent>
    }
  }
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
