import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace } from 'antd-mobile'

@connect(
  state => state.user
)
class User extends Component {
  
  render () {
    const { 
      avatar, 
      user, 
      company, 
      type, 
      title, 
      desc,
      money
    } = this.props
    
    return user ? (
      <div>
        <Result
         img={ <img src={require(`../img/${avatar}.png`)} alt=""style={{width: 50}}/> }
         title={user}
         message={type === 'boss' ? company : ''}/>
        <List renderHeader={() => '简介'}>
          <List.Item>
            { title }
            { desc.split('\n').map(v => (
              <List.Item.Brief key={v}>{ v }</List.Item.Brief>
            ))}
            { money ? <List.Item.Brief>薪资: money</List.Item.Brief> : ''}
          </List.Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <List.Item>退出登录</List.Item>
        </List>
      </div>
    ) : null
  }
}

export default User
