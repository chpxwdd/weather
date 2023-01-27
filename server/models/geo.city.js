const mongoose = require('mongoose')
const Schema = mongoose.Schema

const nestedLanguageCodes = {
	ru: { type: String, maxlength: 150, default: null },
	ua: { type: String, maxlength: 150, default: null },
	be: { type: String, maxlength: 150, default: null },
	en: { type: String, maxlength: 150, default: null },
	es: { type: String, maxlength: 150, default: null },
	pt: { type: String, maxlength: 150, default: null },
	de: { type: String, maxlength: 150, default: null },
	fr: { type: String, maxlength: 150, default: null },
	it: { type: String, maxlength: 150, default: null },
	pl: { type: String, maxlength: 150, default: null },
	ja: { type: String, maxlength: 150, default: null },
	lt: { type: String, maxlength: 150, default: null },
	lv: { type: String, maxlength: 150, default: null },
	cz: { type: String, maxlength: 150, default: null },
}

const schemaGeoCity = new Schema()
schemaGeoCity.set('collection', 'GeoCity')
schemaGeoCity.add({
	city: { type: Number, required: true, index: true },
	region_ref: { type: Schema.Types.ObjectId, ref: 'GeoRegion', required: false, default: null, index: true },
	region: { type: Number, required: false, index: true, default: null },
	country_ref: { type: Schema.Types.ObjectId, ref: 'GeoCountry', required: true, index: true },
	country: { type: Number, required: true, index: true },
	important: { type: Boolean, default: false },
	title: nestedLanguageCodes,
	area: nestedLanguageCodes,
	region: nestedLanguageCodes,
})

module.exports = mongoose.model('GeoCity', schemaGeoCity)
