import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button
} from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../redux/user'
import iForm from '../../component/iForm/iForm'

// class Hello extends Component {
//   render () {
//     return <h2>hello</h2>
//   }
// }

// function WrapperHello (Comp) {
//   class WrapCmp extends Component {
//     render () {
//       return (
//         <div>
//           <p>这是高阶组件</p>
//           <Comp {...this.props}></Comp>
//         </div>
//       )
//     }
//   }

//   return WrapCmp
// }

// Hello = WrapperHello(Hello)

@connect(
  state => state.user,
  {login}
)
@iForm
class Login extends Component {
  constructor (props) {
    super(props)
    // this.state = {
    //   user: '',
    //   pwd: ''
    // }

    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  register () {
    this.props.history.push('/register')
  }

  // handleChange (key, val) {
  //   this.setState({
  //     [key]: val
  //   })
  // }

  handleLogin () {
    this.props.login(this.props.state)
  }

  render () {
    return (
      <div>
        { this.props.redirectTo && this.props.redirectTo !== '/login'
            ? <Redirect to={this.props.redirectTo}></Redirect>
            : null
        }
        <Logo></Logo>
        <WingBlank>
          <List>
            { this.props.msg 
                ? <p className="error-msg">{this.props.msg}</p> 
                : null 
            }
            <InputItem onChange={v => this.props.handleChange('user', v)}>用户</InputItem>
            <WhiteSpace/>
            <InputItem onChange={v => this.props.handleChange('pwd', v)} type="password">密码</InputItem>    
          </List>
          <WhiteSpace/>
          <Button type="primary" onClick={this.handleLogin}>登录</Button>
          <WhiteSpace/>
          <Button type="primary" onClick={this.register}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login