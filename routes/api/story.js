const fs = require('fs')
const path = require('path')
const route = require('express').Router()
const User = require('../../models/User')
const Story = require('../../models/Story')
const { checkToken, sendError } = require('../../utils/helpers')

route.get('/story', async (req, res) => {
  let data = {
    path: 'author',
    select: 'name avatar'
  }

  res.json(await Story.find().populate(data))
})

route.put('/story', async (req, res) => {
  if(req.body.category){
    let opts = {
      path: 'author',
      select: 'name avatar'
    }
  
    let stories = await Story.find({ category: req.body.category }).populate(opts)
  
    if(stories.length) {
      res.json(stories)
    } else {
      res.status(404).json(sendError('Not found yet'))
    }
  } else if(req.body.author) {
    let author = await User.findOne({name: req.body.author}, {_id: 1})
    let opts = {
      path: 'author',
      select: 'name avatar'
    }

    let stories = await Story.find({author}).populate(opts)

    if(stories.length) {
      res.json(stories)
    } else {
      res.status(404).json(sendError('Not found yet'))
    }
  }
})

route.patch('/storyfindbyid', async (req, res) => {
  let opts = {
    path: 'author',
    select: 'name'
  }

  let story = await Story.findOne({ _id: req.body.id }).populate(opts)

  if(story) res.json(story)
  else res.status(502).json(sendError('Failed!'))
})

route.patch('/storyfind', async (req, res) => {
  let opts = {
    path: 'author',
    select: 'name'
  }

  let ress = await Story.find({
    title: {
      $regex: new RegExp(req.body.storyName)
    }
  }).populate(opts)

  res.json(ress)
})

route.post('/story', checkToken, async (req, res) => {
  let story = req.body

  let cov = req.body.cover
  let data = cov.slice(cov.indexOf(',') + 1)
  let ext = cov.slice(11, cov.indexOf(';'))
  ext = ext === 'jpeg' ? 'jpg' : ext

  let coverId = Math.random().toString().slice(3, 23)
  let coverName = `${coverId}.${ext}`
  let coverUrl = `/images/covers/${coverName}`
  let coverPath = path.join(__dirname, '..', '..', 'public', 'images', 'covers', coverName)

  fs.writeFile(coverPath, data, 'base64', async (err, written) => {
    if(err){
      res.status(502).json(sendError('Try later'))
      return 0
    }
    
    story.author = req.currentUser._id
    story.cover = coverUrl
    let addStory = await Story.insertMany([story])

    if(addStory){
      await User.findOneAndUpdate(
        { _id: req.currentUser._id },
        { $push: { stories: addStory[0]._id } }
      )
      res.json({ status: 200 })
    } else {
      res.status(502).json(sendError('Try later'))
    }
  })
})

route.delete('/story', checkToken, async (req, res) => {
  let userId = req.currentUser
  let storyId = req.body.storyId

  await Story.deleteOne({ _id: storyId })
  await User.findByIdAndUpdate( userId, { $pull: { stories: storyId } } )
  
  let opts = {
    path: 'stories',
    name: 'title content cover'
  }
  let stories = await User.findOne({ _id:userId}, {stories: 1}).populate(opts)
  res.json(stories)
})

route.put('/story/like', checkToken, async (req, res) => {
  if(req.body.isLike === 'like') {
    let updUser = await User.findOneAndUpdate(
      { _id: req.currentUser._id },
      { $push: { likedStories: req.body._id } },
      { new: true }
    )
  
    if(!updUser) {
      res.status(502).json(sendError('Failed!'))
      return 0
    }

    let opts = {
      path: 'author',
      select: 'name'
    }
    let updStory = await Story.findOneAndUpdate(
      { _id: req.body._id },
      { $push: { likes: req.currentUser._id } },
      { new: true }
    ).populate(opts)
  
    res.json(updStory)
  } else if (req.body.isLike === 'disLike') {
    let updUser = await User.findOneAndUpdate(
      { _id: req.currentUser._id },
      { $pull: { likedStories: req.body._id } },
      { new: true }
    )
  
    if(!updUser) {
      res.status(502).json(sendError('Failed!'))
      return 0
    }

    let opts = {
      path: 'author',
      select: 'name'
    }
    let updStory = await Story.findOneAndUpdate(
      { _id: req.body._id },
      { $pull: { likes: req.currentUser._id } },
      { new: true }
    ).populate(opts)
  
    res.json(updStory)
  } else {
    res.status(502).json(sendError('Failed!'))
  }
})

route.patch('/story/like', checkToken, async (req, res) => res.json(req.currentUser.likedStories))

module.exports = route