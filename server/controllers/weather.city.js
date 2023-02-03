const modelWeatherCity = require('../models/weather.city.js')

exports.autocompliteLocation = (req, res) => {
	const { location, limit } = req.body

	modelWeatherCity
		.find({ name: { $regex: '^' + location, $options: 'i' } })
		.select('coord name -_id')
		.limit(limit)
		.populate({
			path: 'country_ref',
			select: 'Name CountryCodes.iso2 -_id',
			options: {
				sort: {
					'country_ref.code': 'asc',
				},
			},
		})
		.exec() // callback run
		.then(cities => {
			res.send(
				cities.map(city => {
					return {
						countryCode: city.country_ref.CountryCodes.iso2,
						country: city.country_ref.Name,
						name: city.name,
						coord: city.coord,
					}
				})
				// console.log(arr)
			)
		})
		.catch(err => {
			res.status(500).send({
				message: err.message,
			})
		})
}
