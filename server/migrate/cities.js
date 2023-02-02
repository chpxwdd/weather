/**
 *
 * RUN this command from current file location
 *    node --max-old-space-size=8192 cities.js
 */

const mongoose = require('mongoose')
const config = require('../config/db')
const fs = require('fs')
const JSONStream = require('JSONStream')
require('../models/weather.city.js')
require('../models/weather.country.js')

mongoose
	.connect(config.path, config.options)
	.then(() => {
		console.log('db connect')

		// массив country[code] = ObjectId
		const modelWeatherCountry = mongoose.model('WeatherCountry')

		let countryCodes = []
		modelWeatherCountry
			.find({})
			.then(countries => {
				countries.forEach(country => {
					countryCodes[String(country.code).toLowerCase()] = String(country._id)
				})
				const modelWeatherCity = mongoose.model('WeatherCity')
				fs.createReadStream('./cities.json')
					.pipe(JSONStream.parse('*'))
					.on('data', city => {
						let weatherCity = new modelWeatherCity({
							country_ref: countryCodes[String(city.country).toLowerCase()],
							...city,
						})
						weatherCity.save()
						console.log('success', code, city.name)
					})
			})
			.catch(err => {
				console.error(err)
			})
	})
	.catch(err => {
		console.log('Can not connect to the database' + err)
	})
