import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatUser'
import UserCard from '../../component/usercard/usercard'

@connect(
  state => state.chatUser,
  { getUserList }
)
class Boss extends Component {

  componentDidMount () {
    this.props.getUserList('genius')
  }

  render () {
    return (
      <UserCard userList={this.props.userList}></UserCard>
    )
  }
}

export default Boss
