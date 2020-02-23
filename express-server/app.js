const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// mongodb url from docker-compose
const dbHost = 'mongodb://mongo/mean-docker'

// connect to mongodb
mongoose.connect(dbHost)

// create the user schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
})

// create mongoose model
const User = mongoose.model('User', userSchema)

// GET /
app.get('/', (req, res) => res.send('Hello World'))

// GET /users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})

// GET /users/:id
app.get('/users/:id', async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findById(id)
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})

// POST /users
app.post('/users', async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      age: req.body.age,
    })
    const savedUser = await user.save()
    return res.status(201).json(savedUser)
  } catch (error) {
    return res.status(500).send(error.message)
  }
})

// start server
app.listen(PORT, () => console.log(`listening on port ${ PORT }`))
