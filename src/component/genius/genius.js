import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatUser'
import UserCard from '../../component/usercard/usercard'

@connect(
  state => state.chatUser,
  { getUserList }
)
class Genius extends Component {

  componentDidMount () {
    this.props.getUserList('boss')
  }

  render () {
    return (
      <UserCard userList={this.props.userList}></UserCard>
    )
  }
}

export default Genius
