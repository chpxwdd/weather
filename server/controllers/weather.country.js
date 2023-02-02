const modelWeatherCountry = require('../models/_weather.country.js')

exports.findAll = (req, res) => {
	modelWeatherCountry
		.find({})
		.then(countries => {
			res.send(countries)
		})
		.catch(err => {
			res.status(500).send({
				message: err.message,
			})
		})
}

exports.findOne = (req, res) => {
	modelWeatherCountry
		.findBy({ code: req.params.code })
		.then(countries => {
			res.send(countries)
		})
		.catch(err => {
			res.status(500).send({
				message: err.message,
			})
		})
}
