module.exports = function(app) {
	var controlleGeoCity = require('../controllers/geo.city.js')
	app.post('/api/geo/autocomplite/cityname', controlleGeoCity.autocompliteCityName)
	app.post('/api/geo/autocomplite/citynamedata', controlleGeoCity.autocompliteAgregateCity)
}
