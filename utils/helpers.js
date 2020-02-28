const aes = require('crypto-js/aes')
const CryptoJS = require('crypto-js')
const User = require('../models/User')
// const { CYPHER } = require('../config/dev')

const sendError = error => ({ error })

const generateToken = email => {
  let str = `${email}|${new Date().valueOf() + (3600000 * 24)}`
  return aes.encrypt(str, process.env.CYPHER).toString()
}

const decToken = token => {
  return aes.decrypt(token, process.env.CYPHER).toString(CryptoJS.enc.Utf8)
}

const checkToken = async (req, res, next) => {
  let token = req.body.token

  if (token){
    let tmpEmail = decToken(token).split('|')[0]
    let tmpTime = decToken(token).split('|')[1]

    if (tmpTime <= new Date().valueOf()) {
      res.status(400).json(sendError('Token has expired'))
    } else {
      let currentUser = await User.findOne({ email: tmpEmail })
      req.currentUser = currentUser
      delete req.body.token
      next()
    }
  } else {
    res.status(400).json(sendError('No token'))
  }
}

module.exports = { sendError, generateToken, checkToken, decToken }