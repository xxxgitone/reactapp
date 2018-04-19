import React, { Component } from 'react'
import {
  List,
  Badge
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

    const userid = this.props.user._id
    const userinfo = this.props.chat.users

    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getLastMsg(a).create_time
      const b_last = this.getLastMsg(b).create_time
      return b_last - a_last
    })

    return (
      <div>
        {
          chatList.map(v => {
            const lastMsg = this.getLastMsg(v)
            const targetId = v[0].from === userid ? v[0].to : v[0].from
            const unreadNum = v.filter(v => !v.read && v.to === userid).length
            if (!userinfo[targetId]) {
							return null
						}
            return (
              <List>
                <List.Item
                  key={lastMsg._id}
                  extra={<Badge text={unreadNum}></Badge>}
                  thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
                  arrow="horizontal"
                  onClick={() => {
                    this.props.history.push(`/chat/${targetId}`)
                  }}>
                  {lastMsg.content}
                  <List.Item.Brief>{userinfo[targetId].name}</List.Item.Brief>
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
