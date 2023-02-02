const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schemaWeatherCity = new Schema()
schemaWeatherCity.set('collection', 'WeatherCity')
schemaWeatherCity.add({
	id: Schema.Types.ObjectId,
	country_ref: { type: Schema.Types.ObjectId, ref: 'WeatherCountry' },
	id: { type: Number, required: true, index: true },
	name: { type: String, required: true },
	state: { type: String, default: null },
	coord: {
		lon: { type: Number, default: null },
		lat: { type: Number, default: null },
	},
})

module.exports = mongoose.model('WeatherCity', schemaWeatherCity)
