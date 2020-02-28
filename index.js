const path = require('path')
const express = require('express')

const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(helmet())

app.use(express.json({ limit: '3mb' }))
app.use(express.static(path.join(__dirname, 'client', 'build')))

const mongoose = require('mongoose')
// const { mongoURI } = require('./config/dev')

mongoose
  .connect(process.env.mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(() => console.log('MongoDB can not connect!'))

const login = require('./routes/api/login')
const story = require('./routes/api/story')
const userInfo = require('./routes/api/user')
const registration = require('./routes/api/registration')

app.use('/api', login)
app.use('/api', story)
app.use('/api', userInfo)
app.use('/api', registration)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('Server has begun'))