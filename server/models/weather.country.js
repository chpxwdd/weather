const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schemaWeatherCountry = new Schema()
schemaWeatherCountry.set('collection', 'WeatherCountry')
schemaWeatherCountry.add({
	id: mongoose.Schema.ObjectId,
	code: { type: String, required: true, unique: true, maxlength: 2, lowercase: true },
	CountryCodes: {
		fips: { type: String, maxLength: 2, uppercase: true, default: null },
		iso2: { type: String, maxLength: 2, uppercase: true, default: null },
		iso3: { type: String, maxLength: 3, uppercase: true, default: null },
		isoN: { type: Number, default: null },
		tld: { type: String, maxLength: 2, lowercase: true, default: null },
	},
	Name: { type: String, required: true, default: null },
	Names: { type: Map, of: String, required: true, default: null },
	Capital: {
		DLST: { type: Number, default: null },
		Flg: { type: Number, default: null },
		GeoPt: { type: [Number], default: null },
		Name: { type: String, default: null },
		TD: { type: Number, default: null },
	},
	GeoRectangle: {
		East: { type: Number, default: 0 },
		North: { type: Number, default: 0 },
		South: { type: Number, default: 0 },
		West: { type: Number, default: 0 },
	},
	GeoPt: { type: [Number], default: null },
	Notes: { type: String, default: null },
	SeqID: { type: Number, default: null },
	TelPref: { type: String, default: null },
	Year: { type: String, default: null },
	wm_commons: { type: String, default: null },
	wp_en: { type: String, default: null },
})
module.exports = mongoose.model('WeatherCountry', schemaWeatherCountry)
