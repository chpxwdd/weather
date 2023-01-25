module.exports = function(app) {
	const controllerGeoCountry = require('../controllers/geo.country.js')
	app.get('/api/geo/country', controllerGeoCountry.findAll)
}
