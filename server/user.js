const express = require('express')
const router = express.Router()
const utils = require('utility')
const model = require('./model')
const User = model.getModel('user')

router.get('/list', (req, res) => {
  User.find({}).then(user => {
    return res.json(user)
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