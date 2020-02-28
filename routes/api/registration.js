const User = require('../../models/User')
const route = require('express').Router()
const sha256 = require('crypto-js/sha256')
const { sendError, generateToken } = require('../../utils/helpers')

route.post('/registration', async (req, res) => {
  let user = req.body
  let dbRes = await User.findOne({ email: user.email })

  if(dbRes) {
    res.status(400).json(sendError('This email has already registered'))
    return 0
  }

  user.password = sha256(user.password)
  let addUser = await User.insertMany([user])
  if(addUser) {
    res.json({ token: generateToken(addUser[0].email) })
  } else {
    res.status(502).json(sendError('Try later'))
  }
})

module.exports = route