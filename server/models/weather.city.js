const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schemaWeatherCity = new Schema()
schemaWeatherCity.set('collection', 'WeatherCity')
schemaWeatherCity.add({
	id: Schema.Types.ObjectId,
	code: { type: Number, required: true, index: true },
	name: { type: String, required: true },
	country: {
		type: Schema.Types.ObjectId,
		ref: 'WeatherCountry',
		default: null,
	},
	coord: { type: Map, of: Schema.Types.Decimal128 },
})

module.exports = mongoose.model('WeatherCity', schemaWeatherCity)
