const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://127.0.0.1:27017/chat')

const models = {
  user: {
    user: {
      type: String,
      require: true
    },
    pwd: {
      type: String,
      require: true
    },
    type: {
      type: String,
      require: true
    },
    avatar: {
      type: String
    },
    desc: {
      type: String
    },
    // 职位
    title: {
      type: String
    },
    // boss字段
    company: {
      type: String
    },
    money: {
      type: String
    }
  },
  chat: {
    chatid: {
      type: String,
      require: true
    },
    read: {
      type: Boolean,
      default: false
    },
    from: {
      type: String,
      require: true
    },
    to: {
      type: String,
      require: true
    },
    content: {
      type: String,
      require: true,
      default: ''
    },
    create_time: {
      type: Number,
      default: +new Date()
    }
  }
}

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: (name) => {
    return mongoose.model(name)
  }
}