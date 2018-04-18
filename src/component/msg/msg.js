import React, { Component } from 'react'
import {
  List
} from 'antd-mobile'
import { connect } from 'react-redux'

@connect(
  state => state
)
class Msg extends Component {
  
  getLastMsg (arr) {
    return arr[arr.length - 1]
  }

  render () {
    // 按照聊天用户分组，根据chatid
    const msgGroup = {}
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })

    const chatList = Object.values(msgGroup)
    const userid = this.props.user._id
    const userinfo = this.props.chat.users
    return (
      <div>
        {
          chatList.map(v => {
            const lastMsg = this.getLastMsg(v)
            const targetId = v[0].from === userid ? v[0].to : v[0].from
            const name = userinfo[targetId] && userinfo[targetId].name
            const avatar = userinfo[targetId] && userinfo[targetId].avatar
            return (
              <List>
                <List.Item
                  key={lastMsg._id}
                  thumb={require(`../img/${avatar}.png`)}>
                  {lastMsg.content}
                  <List.Item.Brief>{name}</List.Item.Brief>
                </List.Item>
              </List>
            )
          })
        }
      </div>
    )
  }
}

export default Msg
