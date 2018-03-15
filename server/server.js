const express = require('express')
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017')
mongoose.connection.on('connected', () => console.log('mongo connects uccess'))

const app = express()

app.listen(9000, () => {
  console.log('Node app start at port 9000')
})
