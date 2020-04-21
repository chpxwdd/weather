const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schemaWeatherIcon = new Schema()
schemaWeatherIcon.set('collection', 'WeatherIcon')
schemaWeatherIcon.add({
  id: mongoose.Schema.ObjectId,
  code: { type: String, index: true, required: true, lowercase: true },
  description: { type: String, required: true },
  fileExt: { type: String, default: 'png', required: true },
})

module.exports = mongoose.model('WeatherIcon', schemaWeatherIcon)
