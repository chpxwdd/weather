module.exports = function(app) {
	const API_PREFIX = '/api/weather/client/'
	const controllerWeatherClient = require('../controllers/weather.client.js')
	app.post(API_PREFIX.concat('weather'), controllerWeatherClient.weather) // Current weather for any geolocation
	app.post(API_PREFIX.concat('forecast'), controllerWeatherClient.forecast) // 5-days/3 hour weather forecast
	app.post(API_PREFIX.concat('forecast/hourly'), controllerWeatherClient.forecastHourly) // 5-days/3 hour weather forecast
	app.post(API_PREFIX.concat('forecast/daily'), controllerWeatherClient.forecastDaily) // 16-days/daily weather forecast
	app.post(API_PREFIX.concat('history'), controllerWeatherClient.history) // Historical weather data for 6 years in the past
}
