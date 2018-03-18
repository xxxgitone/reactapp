const express = require('express')
const router = express.Router()
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
    User.create({user, pwd, type}).then(data => {
      return res.json({
        code: 0
      })
    })
  })
})

router.get('/info', (req, res) => {
  return res.json({code: 1})
})

module.exports = router