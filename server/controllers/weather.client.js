const client = require('../opemweathermap/client')
const axios = require('axios')

exports.weather = (request, responce) => {
	const { city, country, mode, units, lang } = request.body
	axios
		.get(client.currentWeather(city, country, { mode, units, lang }))
		.then(res => {
			responce.send(res.data)
		})
		.catch(err => {
			responce.status(500).send({ message: err.response.data })
		})
}

exports.forecast = (request, responce) => {} // 5-days/3 hour weather forecast
exports.forecastHourly = (request, responce) => {} // 16-days/daily weather forecast
exports.forecastDaily = (request, responce) => {} // Historical weather data for 6 years in the past
exports.history = (request, responce) => {} // Historical weather data for 6 years in the past
