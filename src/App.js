import React, { Component } from 'react'
import { Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { addCount, minsCount, addCountAsync } from './redux'

const mapStateToProps = (state) => {
  return {
    count: state
  }
}

const mapDispatchToProps = {
  addCount,
  minsCount,
  addCountAsync
}

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {
  render () {
    const { 
      count,
      addCount,
      minsCount,
      addCountAsync
    }  = this.props
    return (
      <div>
        <h2>{count}</h2>
        <Button type="primary" onClick={addCount}>+</Button>
        <Button type="primary" onClick={minsCount}>-</Button>
        <Button type="primary" onClick={addCountAsync}>异步+</Button>        
      </div>
    )
  }
}

export default App;