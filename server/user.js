const express = require('express')
const router = express.Router()
const utils = require('utility')
const model = require('./model')
const User = model.getModel('user')
const Chat= model.getModel('chat')

router.get('/list', (req, res) => {
  const { type } = req.query

  User.find({type}).then(user => {
    return res.json({
      code: 0,
      data: user
    })
  })
})

router.post('/register', (req, res) => {
  const { user, pwd, type } = req.body
  User.findOne({user}).then(data => {
    if (data) {
      return res.json({
        code: 1,
        msg: '用户名重复'
      })
    }

    const userModel = new User({
      user,
      type,
      pwd: md5Pwd(pwd)
    })

    userModel.save().then(data => {
      const { user, type, _id } = data
      res.cookie('userid', _id)
      return res.json({
        code: 0,
        data: {
          user,
          type,
          _id
        }
      })
    }).catch(e => {
      return res.json({
        code: 1,
        msg: '后台出错了'
      })
    })
  })
})

router.get('/getmsglist', (req, res) => {
  const user = req.cookies.userid
  User.find({}).then(userDoc => {
    let users = {}
    userDoc.forEach(user => {
      users[user._id] = {
        name: user.user,
        avatar: user.avatar
      }
    })
    // 查询当前用户发出，和发送给当前用户的
    Chat.find({'$or': [{from: user},{to: user}]})
      .then(msgs => {
        return res.json({
          code: 0,
          users: users,
          msgs
        })
      })
  })
})

router.post('/update', (req, res) => {
  const userid = req.cookies.userid
  if (!userid) {
    return res.json({code: 1})
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body)
    .then(user => {
      const data = Object.assign({}, {
        user: user.user,
        type: user.type
      }, body)
      return res.json({
        code: 0,
        data
      })
    })
})

router.post('/login', (req, res) => {
  const { user, pwd } = req.body
  User.findOne({user, pwd: md5Pwd(pwd)}, {pwd: 0}).then(data => {
    if (data) {
      // 设置cookie
      res.cookie('userid', data._id)
      return res.json({
        code: 0,
        data
      })
    } else {
      return res.json({
        code: 1,
        msg: '用户名不存在或者密码错误'
      })
    }
  })
})

router.get('/info', (req, res) => {
  const { userid } = req.cookies
  if (!userid) {
    return res.json({code: 1})
  }
  User.findOne({_id: userid}, {pwd: 0}).then(data => {
    return res.json({
      code: 0,
      data
    })
  }).catch(e => {
    return res.json({
      code: 1,
      msg: '后台出错了'
    })
  })
})

function md5Pwd (pwd) {
  const salt = '_md5_salt_'
  // 加盐,并且两层md5处理
  return utils.md5(utils.md5(pwd + salt))
}

module.exports = router