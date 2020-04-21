const modelWeatherCity = require('../models/weather.city.js')

/**
 *   Возвращает выборку городов по части названия
 */
exports.autocompliteLocation = (req, res) => {
	var location = req.body.location

	modelWeatherCity
		.find(
			{ name: { $regex: '^' + location, $options: 'i' } },
			['code', 'name', 'country.code', 'country.name', 'country.capital'],
			{ sort: { 'country.code': 1, name: -1 }, limit: 10 },
			null
			)
			.populate('country') // select ONLY field code from country collection
			.exec() // callback run
			.then(cities => {
				// console.log(city.name);
			// формирование необходимого ответа
			var arr = []
			cities.forEach(city => {

				console.log(city.name);

				arr.push({
					code: city.code,
					title: String(city.name)
						.concat(',')
						.concat(city.country.code),
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
