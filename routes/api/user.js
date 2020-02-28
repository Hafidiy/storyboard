const fs = require('fs')
const path = require('path')
const User = require('../../models/User')
const sha256 = require('crypto-js/sha256')
const route = require('express').Router()
const { checkToken, sendError } = require('../../utils/helpers')

route.post('/userInfo', checkToken, async (req, res) => {
  let data = {
    path: 'stories',
    select: 'title content cover'
  }

  let user = await User.findOne(
    { _id: req.currentUser._id },
    { password: 0, _id: 0, __v: 0 }
  ).populate(data)
  res.json({ ...user._doc })
})

route.put('/userInfo', checkToken, async (req, res) => {
  let tmpUser = req.body

  const isExist = await User.findOne({ name: req.body.name })

  if(sha256(tmpUser.oldPassword).toString() !== req.currentUser.password) {
    res.status(400).json(sendError('Wrong password'))
    return 0
  }

  if(isExist){
    res.status(400).json(sendError('Username has already taken'))
    return 0
  }

  if(req.currentUser.avatar === tmpUser.avatar){
    let data = {
      path: 'stories',
      name: 'title content cover'
    }

    let updUser = await User.findOneAndUpdate(
      { _id: req.currentUser._id },
      { $set: {
        password: sha256(tmpUser.newPassword).toString(),
        name: tmpUser.name,
      } },
      { new: true }
    )
    if(updUser)
      res.json(await User.findOne(
        {_id: updUser._id},
        { password: 0, _id: 0, __v: 0 }
      ).populate(data))
    else res.status(502).json(sendError('Try later'))

    return 0
  }

  let ava = tmpUser.avatar
  let data = ava.slice(ava.indexOf(',') + 1)
  let ext = ava.slice(11, ava.indexOf(';'))
  ext = ext === 'jpeg' ? 'jpg' : ext

  let avatarId = Math.random().toString().slice(3, 23)
  let avatarName = `${avatarId}.${ext}`
  let avatarUrl = `/avatars/${avatarName}`
  let avatarPath = path.join(__dirname, '..', 'build', 'avatars', avatarName)

  fs.writeFile(avatarPath, data, 'base64', async (err, written) => {
    if (err) res.status(502).json('Try later')

    let data = {
      path: 'stories',
      name: 'title content cover'
    }
    let updUser = await User.findOneAndUpdate(
      { _id: req.currentUser._id },
      { $set: {
        password: sha256(tmpUser.newPassword).toString(),
        name: tmpUser.name,
        avatar: avatarUrl,
      } },
      { new: true }
    )
    if(updUser)
      res.json(await User.findOne(
        {_id: updUser._id},
        { password: 0, _id: 0, __v: 0 }
      ).populate(data))
    else res.status(502).json(sendError('Try later'))
  })
})

module.exports = route