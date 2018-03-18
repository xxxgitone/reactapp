import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import {
  List,
  InputItem,
  Radio,
  WingBlank,
  WhiteSpace,
  Button
} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/user'

// const mapStateToProps = state => {
//   return {
//     user: state.user
//   }
// }

// const mapActionToProps = {
//   register
// }

// @connect(mapStateToProps, mapActionToProps)
@connect(
  state => state.user,
  {register}
)
class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
      repeatpwd: '',
      type: 'genius'
    }

    this.handleRegister = this.handleRegister.bind(this)
  }

  handleChange (key, val) {
    this.setState({
      [key]: val
    })
  }

  handleRegister () {
    this.props.register(this.state)
  }

  render () {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        { this.props.redirectTo 
            ? <Redirect to={this.props.redirectTo}></Redirect>
            : null
        }
        <Logo></Logo>
        <List>
          { this.props.msg 
              ? <p className="error-msg">{this.props.msg}</p> 
              : null 
          }
          <InputItem onChange={v => this.handleChange('user', v)}>用户名</InputItem>
          <InputItem 
            onChange={v => this.handleChange('pwd', v)}
            type="password">密码</InputItem>
          <InputItem 
            onChange={v => this.handleChange('repeatpwd', v)}
            type="password">确认密码</InputItem>
          <RadioItem 
            checked={this.state.type === 'genius'}
            onChange={v => this.handleChange('type', 'genius')}>牛人</RadioItem>        
          <RadioItem 
            checked={this.state.type === 'boss'}
            onChange={v => this.handleChange('type', 'boss')}>BOSS</RadioItem>
          <WhiteSpace/>
          <WingBlank>
            <Button type="primary" onClick={this.handleRegister}>注册</Button>
          </WingBlank>
        </List>
      </div>
    )
  }
}

export default Register
