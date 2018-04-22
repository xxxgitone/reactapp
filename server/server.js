const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')
const model = require('./model')
const Chat = model.getModel('chat')
const path = require('path')
const app = express()

// work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', (socket) => {
  console.log('user connect')
  socket.on('sendmsg', (data) => {
    const { from, to, msg } = data
    const chatid = [from, to].sort().join('_')
    Chat.create({
      chatid,
      from,
      to,
      content: msg
    }).then(doc => {
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
  })
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)
app.use((req, res, next) => {
  if (req.url.startsWith('/user/') || req.url.startsWith('/static')) {
    return next()
  }
  return res.sendFile(path.resolve('build/index.html'))
})
app.use('/', express.static(path.resolve('build')))

server.listen(9000, () => {
  console.log('Node app start at port 9000')
})
