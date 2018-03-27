import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  Result,
  List,
  WhiteSpace,
  Modal
} from 'antd-mobile'
import { logoutSubmit } from '../../redux/user'
import browserCookies from 'browser-cookies'
import { Redirect } from 'react-router-dom'

@connect(
  state => state.user,
  { logoutSubmit }
)
class User extends Component {
  constructor (props) {
    super(props)

    this.logout = this.logout.bind(this)
  }

  logout () {
    Modal.alert('注销', '确定退出登录吗?', [
      { text: '取消', onPress: () => console.log('q')},
      { text: '确定', onPress: () => {
        browserCookies.erase('userid')
        this.props.logoutSubmit()
      }}
    ])

  }

  render () {
    const { 
      avatar,
      user,
      company,
      type,
      title, 
      desc,
      money,
      redirectTo
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
          <List.Item onClick={this.logout}>退出登录</List.Item>
        </List>
      </div>
    ) : <Redirect to={redirectTo}></Redirect>
  }
}

export default User
