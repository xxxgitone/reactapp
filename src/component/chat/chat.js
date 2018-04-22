import React, { Component } from 'react'
import {
  List,
  InputItem,
  NavBar,
  Icon,
  Grid
} from 'antd-mobile'
import { getChatId } from '../../util'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat'
import QueueAnim from 'rc-queue-anim'

@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg }
)
class Chat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      showEmoji: false
    }
  }

  componentDidMount () {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }

  fixCarousel () {
     // emoji：修复grid的bug
     setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }

  handleSubmit () {
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState({text: ''})
  }

  render () {
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
										.split(' ')
										.filter(v=>v)
                    .map(v=>({text:v}))

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
        <QueueAnim delay={100}>
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
        </QueueAnim>
        <div className="stick-footer">
          <List>
            <InputItem 
              placeholder="输入消息"
              value={this.state.text}
              onChange={v => this.setState({text: v})}
              extra={
                <div>
                  <span 
                    style={{marginRight:15}} 
                    onClick={() => {
                      this.setState({showEmoji: !this.state.showEmoji})
                      this.fixCarousel()
                    }}>😀</span>
                  <span onClick={() => this.handleSubmit()}>发送</span>
                </div>
              }>
              消息
            </InputItem>
          </List>
          {this.state.showEmoji ? <Grid 
            data={emoji}
            columnNum={9}
            carouselMaxRow={4}
            isCarousel={true}
            onClick={el => {
              this.setState({text: this.state.text + el.text})
            }}>
          </Grid> : ''}
          
        </div>
      </div>
    )
  }
}

export default Chat
