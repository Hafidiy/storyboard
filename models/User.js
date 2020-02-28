const { model, Schema } = require('mongoose')

const usersSchema = new Schema({
  email: String,
  password: String,
  stories: [{
    ref: 'Stories',
    type: Schema.Types.ObjectId,
  }],
  date_created: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
    default: '/images/image.png',
  },
  name: {
    type: String,
    default: `NewUser${Math.random().toString().slice(3, 9)}`
  },
  likedStories: [{
    ref: 'Stories',
    type: Schema.Types.ObjectId
  }]
})

const User = model('Users', usersSchema)

module.exports = User