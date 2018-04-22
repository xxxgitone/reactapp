import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, applyMiddleware } from './mini-redux'
import { Provider } from './mini-react-redux'
import thunk from './mini-redux-thunk'
import arrayThunk from './min-redux-arr'
// context
// import ContextPage from './context-demo'
// ReactDOM.render(
//   <ContextPage/>,
//   document.getElementById('root')
// )


import { counter } from './app-redux'

const store = createStore(counter, applyMiddleware(thunk, arrayThunk))

// const store = createStore(reducers, compose(
//   applyMiddleware(thunk),
//   // redux调试工具
//   window.devToolsExtension 
//     ? window.devToolsExtension()
//     : f => f
// ))

// import './redux-demo'

ReactDOM.render(
  (
    <Provider store={store}>
      <App/>
    </Provider>
  ),
  document.getElementById('root')
)
