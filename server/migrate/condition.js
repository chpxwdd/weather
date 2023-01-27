require('../models/weather.icon.js')
require('../models/weather.condition.js')
const { WeatherIcon } = require('../models/weather.icon')
const { WeatherCondition } = require('../models/weather.condition')
const mongoose = require('mongoose')
const config = require('../config/db')

const WEATHER_CONDITION = [
	{ main: 'Thunderstorm', code: 200, description: 'thunderstorm with light rain', icon: '11' },
	{ main: 'Thunderstorm', code: 201, description: 'thunderstorm with rain', icon: '11' },
	{ main: 'Thunderstorm', code: 202, description: 'thunderstorm with heavy rain', icon: '11' },
	{ main: 'Thunderstorm', code: 210, description: 'light thunderstorm', icon: '11' },
	{ main: 'Thunderstorm', code: 211, description: 'thunderstorm', icon: '11' },
	{ main: 'Thunderstorm', code: 212, description: 'heavy thunderstorm', icon: '11' },
	{ main: 'Thunderstorm', code: 221, description: 'ragged thunderstorm', icon: '11' },
	{ main: 'Thunderstorm', code: 230, description: 'thunderstorm with light drizzle', icon: '11' },
	{ main: 'Thunderstorm', code: 231, description: 'thunderstorm with drizzle', icon: '11' },
	{ main: 'Thunderstorm', code: 232, description: 'thunderstorm with heavy drizzle', icon: '11' },

	{ main: 'Drizzle', code: 300, description: 'light intensity drizzle', icon: '09' },
	{ main: 'Drizzle', code: 301, description: 'drizzle', icon: '09' },
	{ main: 'Drizzle', code: 302, description: 'heavy intensity drizzle', icon: '09' },
	{ main: 'Drizzle', code: 310, description: 'light intensity drizzle rain', icon: '09' },
	{ main: 'Drizzle', code: 311, description: 'drizzle rain', icon: '09' },
	{ main: 'Drizzle', code: 312, description: 'heavy intensity drizzle rain', icon: '09' },
	{ main: 'Drizzle', code: 313, description: 'shower rain and drizzle', icon: '09' },
	{ main: 'Drizzle', code: 314, description: 'heavy shower rain and drizzle', icon: '09' },
	{ main: 'Drizzle', code: 321, description: 'shower drizzle', icon: '09' },

	{ main: 'Rain', code: 500, description: 'light rain', icon: '10' },
	{ main: 'Rain', code: 501, description: 'moderate rain', icon: '10' },
	{ main: 'Rain', code: 502, description: 'heavy intensity rain', icon: '10' },
	{ main: 'Rain', code: 503, description: 'very heavy rain', icon: '10' },
	{ main: 'Rain', code: 504, description: 'extreme rain', icon: '10' },
	{ main: 'Rain', code: 511, description: 'freezing rain', icon: '13' },
	{ main: 'Rain', code: 520, description: 'light intensity shower rain', icon: '09' },
	{ main: 'Rain', code: 521, description: 'shower rain', icon: '09' },
	{ main: 'Rain', code: 522, description: 'heavy intensity shower rain', icon: '09' },
	{ main: 'Rain', code: 531, description: 'ragged shower rain', icon: '09' },

	{ main: 'Snow', code: 600, description: 'light snow', icon: '13' },
	{ main: 'Snow', code: 601, description: 'Snow', icon: '13' },
	{ main: 'Snow', code: 602, description: 'Heavy snow', icon: '13' },
	{ main: 'Snow', code: 611, description: 'Sleet', icon: '13' },
	{ main: 'Snow', code: 612, description: 'Light shower sleet', icon: '13' },
	{ main: 'Snow', code: 613, description: 'Shower sleet', icon: '13' },
	{ main: 'Snow', code: 615, description: 'Light rain and snow', icon: '13' },
	{ main: 'Snow', code: 616, description: 'Rain and snow', icon: '13' },
	{ main: 'Snow', code: 620, description: 'Light shower snow', icon: '13' },
	{ main: 'Snow', code: 621, description: 'Shower snow', icon: '13' },
	{ main: 'Snow', code: 622, description: 'Heavy shower snow', icon: '13' },

	{ main: 'Mist', code: 701, description: 'mist', icon: '50' },
	{ main: 'Smoke', code: 711, description: 'Smoke', icon: '50' },
	{ main: 'Haze', code: 721, description: 'Haze', icon: '50' },
	{ main: 'Dust', code: 731, description: 'sand/ dust whirls', icon: '50' },
	{ main: 'Fog', code: 741, description: 'fog', icon: '50' },
	{ main: 'Sand', code: 751, description: 'sand', icon: '50' },
	{ main: 'Dust', code: 761, description: 'dust', icon: '50' },
	{ main: 'Ash', code: 762, description: 'volcanic ash', icon: '50' },
	{ main: 'Squall', code: 771, description: 'squalls', icon: '50' },
	{ main: 'Tornado', code: 781, description: 'tornado', icon: '50' },

	{ main: 'Clear', code: 800, description: 'clear sky', icon: '01' },

	{ main: 'Clouds', code: 801, description: 'few clouds: 11-24%', icon: '02' },
	{ main: 'Clouds', code: 802, description: 'scattered clouds: 25-50%', icon: '03' },
	{ main: 'Clouds', code: 803, description: 'broken clouds: 51-84%', icon: '04' },
	{ main: 'Clouds', code: 804, description: 'overcast clouds: 85-100%', icon: '04' },
]

mongoose
	.connect(config.path, config.options)
	.then(res => {
		console.log('SUCCESS db connect')
	})
	.catch(err => {
		console.log('ERROR db connect', err)
	})

const modelWeatherIcon = mongoose.model('WeatherIcon')
const modelWeatherCondition = mongoose.model('WeatherCondition')

modelWeatherIcon.find({}).then(icons => {
	var iconsCodes = []

	icons.forEach(icon => {
		iconsCodes[icon.code] = icon._id
	})

	WEATHER_CONDITION.forEach((condition, index) => {
		var itemWeatherCondition = new modelWeatherCondition({
			code: condition.code,
			main: condition.main,
			description: condition.description,
			icon: iconsCodes[condition.icon],
		})

		itemWeatherCondition
			.save()
			.then(res => {
				console.log('SUCCESS load icon data')
			})
			.catch(err => {
				console.error('ERROR load icon data', err)
			})
	})
})
