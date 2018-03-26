import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'

class UserCard extends Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  }

  render () {
    return (
      <WingBlank>
        <WhiteSpace></WhiteSpace>
        {
          this.props.userList.map(v => (
            v.avatar 
              ? (<Card key={v._id}>
                  <Card.Header
                    title={v.user}
                    thumb={require(`../img/${v.avatar}.png`)}
                    extra={<span>{v.title}</span>}>
                  </Card.Header>
                  <Card.Body>
                    { v.type === 'boss' ? <div>公司: {v.company}</div> :null}
                    {v.desc.split('\n').map(d => (
                      <div key={d}>{d}</div>
                    ))}
                    { v.type === 'boss' ? <div>薪资: {v.money}</div> :null}
                  </Card.Body>
                </Card>)
              : null
          ))
        }
      </WingBlank>
    )
  }
}

export default UserCard
