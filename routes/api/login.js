const route = require('express').Router()
const sha256 = require('crypto-js/sha256')
const User = require('../../models/User')
const { sendError, generateToken } = require('../../utils/helpers')

route.post('/login', async (req, res) => {
  let user = req.body
  let dbUser = await User.findOne({ email: user.email })
  
  if(!dbUser){
    res.status(404).json(sendError('This email has not registered yet'))
    return 0
  }

  if(sha256(user.password).toString() === dbUser.password){
    res.json({ token: generateToken(user.email) })
  } else {
    res.status(400).json(sendError('Wrong password'))
  }
})

module.exports = route