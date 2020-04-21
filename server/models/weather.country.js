const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schemaWeatherCountry = new Schema()
schemaWeatherCountry.set('collection', 'WeatherCountry')
schemaWeatherCountry.add({
  id: mongoose.Schema.ObjectId,
  code: { type: String, required: true, unique: true, maxlength: 2, lowercase: true },
  name: { type: String, required: true },
  names: { type: Map, of: String, required: true },
  capital: { type: String, default: null },
  geo_point: { type: [Schema.Types.Decimal128], default: null },
  geo_rect: { type: Map, of: Schema.Types.Decimal128, default: null },
  notes: { type: String, default: null },
})
module.exports = mongoose.model('WeatherCountry', schemaWeatherCountry)
