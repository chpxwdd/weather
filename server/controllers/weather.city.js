const modelWeatherCity = require('../models/weather.city.js')

/**
 *   Возвращает выборку городов по части названия
 */
exports.autocompliteLocation = (req, res) => {
	var location = req.body.location

	modelWeatherCity
		.find({ name: { $regex: '^' + location, $options: 'i' } })
		// .select('code name -_id')
		.limit(12)
		.populate({
			path: 'country_ref',
			// select: 'code name -_id',
			options: {
				sort: {
					// 'country_ref.code': 'desc',
					'country_ref.name': 'asc',
				},
			},
		}) // select ONLY field code from country collection

		.exec() // callback run
		.then(cities => {
			console.log(cities)
			// формирование необходимого ответа
			var arr = []
			cities.forEach(city => {
				arr.push({
					code: city.code,
					title: String(city.country_ref.code)
						.toUpperCase()
						.concat(', ')
						.concat(String(city.name)),
				})
			})
			res.send(arr)
		})
		.catch(err => {
			res.status(500).send({
				message: err.message,
			})
		})
}
