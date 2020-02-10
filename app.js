require("dotenv").config();
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require ('mongoose')
const mongoUsername = process.env.MONGO_USERNAME
const mongoPassword = process.env.MONGO_PASSWORD
const mongoHostname = process.env.MONGO_HOSTNAME
const mongoDB = process.env.MONGO_DB
const cors = require('cors')
const multer = require('multer')
const port = process.env.PORT || 8080

const feedRoutes = require('./routes/feed')

const app = express()

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if(
    file.mimetype === 'image/png' ||
    file.mimetype === 'image.jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

app.use(bodyParser.json())
app.use(multer({
  storage: fileStorage,
  fileFilter: fileFilter})
  .single('image'))
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use(cors())

app.use('/feed', feedRoutes)

app.use((err, req, res, next) => {
  console.log(err)
  const status = err.statusCode || 500
  const message = err.message
  const data = err.data
  res.status(status).json({message: message, data: data})
})

mongoose
  .connect(
    `mongodb+srv://${mongoUsername}:${mongoPassword}@${mongoHostname}/${mongoDB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
  })
  .then(result => {
    app.listen(port, () => console.log(`================================\nServer is listening on port ${port}\n================================`))
  })
  .catch(err => console.log(err))
