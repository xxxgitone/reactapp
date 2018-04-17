import React, { Component } from 'react'
import {
  List,
  InputItem,
  NavBar,
  Icon
} from 'antd-mobile'
import { getChatId } from '../../util'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat'

@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg }
)
class Chat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      msg: []
    }
  }

  componentDidMount () {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }

  handleSubmit () {
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState({text: ''})
  }

  render () {
    const userid = this.props.match.params.user
    const { users } = this.props.chat
    const chatid = getChatId(userid, this.props.user._id)
    const chatmsg = this.props.chat.chatmsg.filter(v => v.chatid === chatid)
    if (!users[userid]) {
      return null
    }
    return (
      <div id="chat-page">
        <NavBar
          mode="drak"
          icon={<Icon type="left"/>}
          onClick={() => { this.props.history.goBack() }}>
          {users[userid].name}
        </NavBar>
        {chatmsg.map(v => {
          const avatar = require(`../img/${users[v.from].avatar}.png`)
          return v.from === userid ? (
            <List key={v._id}>
              <List.Item thumb={avatar}>{v.content}</List.Item>
            </List>
          ) : (
            <List key={v._id}>
              <List.Item 
                className="chat-me" 
                extra={<img src={avatar}/>}>
                {v.content}
              </List.Item>
            </List>
          )
        })}
        <div className="stick-footer">
          <List>
            <InputItem 
              placeholder="输入消息"
              value={this.state.text}
              onChange={v => this.setState({text: v})}
              extra={<span onClick={() => this.handleSubmit()}>发送</span>}>
              消息
            </InputItem>
          </List>
        </div>
      </div>
    )
  }
}

export default Chat
