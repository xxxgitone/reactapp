import React, { Component } from 'react'
import {
  List,
  InputItem,
  NavBar
} from 'antd-mobile'
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
    this.props.getMsgList()
    this.props.recvMsg()
  }

  handleSubmit () {
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState({text: ''})
  }

  render () {
    const { user } = this.props.match.params
    return (
      <div id="chat-page">
        <NavBar mode="drak">
          {user}
        </NavBar>
        { this.props.chat.chatmsg.map(v => {
          return v.from === user ? (
            <List key="v._id">
              <List.Item>{v.content}</List.Item>
            </List>
          ) : (
            <List key="v._id">
              <List.Item 
                className="chat-me" 
                extra={'avatar'}>
                {v.content}
              </List.Item>
            </List>
          )
        })}
        <div className="stick-footer">
          <List>
            <InputItem 
              placeholder="input"
              value={this.state.text}
              onChange={v => this.setState({text: v})}
              extra={<span onClick={() => this.handleSubmit()}>fasong</span>}>
              xiaoxi
            </InputItem>
          </List>
        </div>
      </div>
    )
  }
}

export default Chat
