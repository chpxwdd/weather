
module.exports = function(app) {
	var controllerWeatherCity = require('../controllers/weather.city.js')
	app.post('/api/weather/autocomplite/location', controllerWeatherCity.autocompliteLocation)
}
