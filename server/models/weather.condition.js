const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schemaWeatherCondition = new Schema()
schemaWeatherCondition.set('collection', 'WeatherCondition')
schemaWeatherCondition.add({
  id: mongoose.Schema.ObjectId,
  code: { type: Number, required: true, index: true },
  main: { type: String, required: true },
  description: { type: String, required: true },
  icon: {
    type: Schema.Types.ObjectId,
    ref: 'WeatherIcon',
    default: null,
  },
})

module.exports = mongoose.model('WeatherCondition', schemaWeatherCondition)
