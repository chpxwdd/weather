const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schemaGeoCountry = new Schema()
schemaGeoCountry.set('collection', 'GeoCountry')
schemaGeoCountry.add({
	country: { type: Number, required: true, index: true },
	title: {
		ru: { type: String, maxlength: 60 },
		ua: { type: String, maxlength: 60 },
		be: { type: String, maxlength: 60 },
		en: { type: String, maxlength: 60 },
		es: { type: String, maxlength: 60 },
		pt: { type: String, maxlength: 60 },
		de: { type: String, maxlength: 60 },
		fr: { type: String, maxlength: 60 },
		it: { type: String, maxlength: 60 },
		pl: { type: String, maxlength: 60 },
		ja: { type: String, maxlength: 60 },
		lt: { type: String, maxlength: 60 },
		lv: { type: String, maxlength: 60 },
		cz: { type: String, maxlength: 60 },
	},
})
module.exports = mongoose.model('GeoCountry', schemaGeoCountry)
