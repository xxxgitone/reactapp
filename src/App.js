import React, { Component } from 'react'
import { connect } from './mini-react-redux'
import { addCount, minCount, asyncAdd, addTwo } from './app-redux'

const mapStateToProps = (state) => {
  return {
    count: state
  }
}

const mapDispatchProps = {
  addCount,
  minCount,
  asyncAdd,
  addTwo
}
@connect(mapStateToProps, mapDispatchProps)
class App extends Component {
  render () {
    return (
      <div>
        <h2>当前值为{this.props.count}</h2>
        <button onClick={this.props.addCount}>+</button>
        <button onClick={this.props.minCount}>-</button>
        <button onClick={this.props.asyncAdd}>异步+</button>
        <button onClick={this.props.addTwo}>+2</button>
      </div>
    )
  }
}

// App = connect(
//   state => ({num: state}),
//   { addCount, minCount, asyncAdd }
// )(App)
export default App
