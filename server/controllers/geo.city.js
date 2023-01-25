const modelGeoCity = require('../models/geo.city.js')

/**
 *   Возвращает выборку городов по части названия
 */
exports.autocompliteCityName = (req, res) => {
	var q = req.body.q
	var lang = req.body.lang ? 'ru' : 'en'
	const byField = `title.${lang}`
	modelGeoCity
		.find(
			{ [byField]: { $regex: '^' + q, $options: 'i' } }
			// ,
			// ['code', 'name', 'country.code', 'country.name', 'country.capital'],
			// { sort: { 'country.code': 1, name: -1 }, limit: 10 },
			// null
		)
		// .populate('country') // select ONLY field code from country collection
		.exec() // callback run
		.then(cities => {
			console.log(cities)
			console.log(cities.length)
			// формирование необходимого ответа
			var arr = []
			cities.forEach(city => {
				// console.log(city.name)

				arr.push({
					code: city.code,
					title: String(city.title[lang])
						.concat(', ')
						.concat(city.country),
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
