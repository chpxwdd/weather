const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('./config/db')
const PORT = process.env.PORT || 8000

mongoose
  .connect(config.path, config.options)
  .then(() => {
    console.log('Database is connected')
  })
  .catch(err => {
    console.log('Can not connect to the database' + err)
  })

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require('./routes/weather.client')(app)
require('./routes/weather.country')(app)
require('./routes/weather.city')(app)
require('./routes/weather.condition')(app)
require('./routes/weather.icon')(app)
require('./routes/core.user')(app)

// require('./config/db.install')

const passport = require('passport')
require('./config/passport')(passport)
app.use(passport.initialize())

app.listen(PORT, () => {
  console.log('running on', PORT, 'port')
})
