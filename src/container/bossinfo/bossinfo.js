import React, { Component } from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { update } from '../../redux/user'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

@connect(
  state => state.user,
  { update }
)
class BossInfo extends Component {
  constructor () {
    super()
    this.state = {
      avatar: '',
      title: '',
      company: '',
      money: '',
      desc: ''
    }

    this.selectAvatar = this.selectAvatar.bind(this)
  }

  handleChange (key, val) {
    this.setState({
      [key]: val
    })
  }

  selectAvatar (imgName) {
    this.setState({
      avatar: imgName
    })
  }

  render () {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect && redirect !== path ? <Redirect to={redirect}></Redirect> : null}
        <NavBar mode="dark">BOSS完善信息页面</NavBar>
        <AvatarSelector selectAvatar={this.selectAvatar}></AvatarSelector>
        <InputItem onChange={v => this.handleChange('title', v)}>招聘职位</InputItem>
        <InputItem onChange={v => this.handleChange('company', v)}>公司名称</InputItem>
        <InputItem onChange={v => this.handleChange('money', v)}>职位薪资</InputItem>
        <TextareaItem 
          title="职位要求" 
          rows={3}
          autoHeight 
          onChange={v => this.handleChange('desc', v)}>
        </TextareaItem>
        <Button type="primary" onClick={() => {
          this.props.update(this.state)
        }}>保存</Button>
      </div> 
    )
  }
}

export default BossInfo