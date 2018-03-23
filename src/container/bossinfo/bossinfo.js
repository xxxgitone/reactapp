import React, { Component } from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
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
    return (
      <div>
        <NavBar mode="dark">BOSS完善信息页面</NavBar>
        <AvatarSelector selectAvatar={this.selectAvatar}></AvatarSelector>
        <InputItem onChange={v => this.handleChange('title', v)}>招聘职位</InputItem>
        <InputItem onChange={v => this.handleChange('company', v)}>公司名称</InputItem>
        <InputItem onChange={v => this.handleChange('money', v)}>职位薪资</InputItem>
        <TextareaItem 
          title="职位要求" 
          rows="2" 
          autoHeight 
          onChange={v => this.handleChange('desc', v)}>
        </TextareaItem>
        <Button type="primary">保存</Button>
      </div> 
    )
  }
}

export default BossInfo