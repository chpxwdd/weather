/**
 *
 * RUN this command from current file location
 *    node --max-old-space-size=8192 countries.js
 */

const mongoose = require('mongoose')
const config = require('../config/db')
const fs = require('fs')
const JSONStream = require('JSONStream')
require('../models/weather.country.js')

mongoose
	.connect(config.path, config.options)
	.then(res => {
		console.log('Connect to the database succes')
		let countries
		let keys
		fs.createReadStream('./iso-3166-1.json')
			.pipe(JSONStream.parse('*'))
			.on('data', countryObj => {
				countries = countryObj
				keys = Object.keys(countryObj)
				const modelWeatherCountry = mongoose.model('WeatherCountry')
				Object.keys(countryObj).forEach((key, i) => {
					// if (key !== 'AD') return

					let country = countryObj[key]
					// console.log(country)
					var weatherCountry = new modelWeatherCountry({
						code: key,
						...country,
					})
					// console.log(i, key)
					// console.log(weatherCountry)
					weatherCountry.save()
					// console.log('SUCCESS: code ', country['CountryCodes']['iso2'], 'country ', country['Name'])
				})
			})

		// keys.forEach(key => {
		// 	console.log(key)
		// })
	})
	.catch(err => {
		console.log('Can not connect to the database' + err)
	})
