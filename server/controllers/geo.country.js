const modelGeoCountry = require('../models/geo.country.js')

exports.findAll = (req, res) => {
	modelGeoCountry
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
