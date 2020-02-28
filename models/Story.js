const { model, Schema } = require('mongoose')

const storiesSchema = new Schema({
  title: String,
  content: String,
  category: String,
  author: {
    ref: 'Users',
    type: Schema.Types.ObjectId,
  },
  likes: [Schema.Types.ObjectId],
  date_created: {
    type: Date,
    default: Date.now
  },
  cover: {
    type: String,
    default: '/images/book4.jpg',
  },
  likes: [{
    ref: 'Users',
    type: Schema.Types.ObjectId
  }]
})

module.exports = Story = model('Stories', storiesSchema)