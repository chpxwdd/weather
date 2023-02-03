const modelGeoCity = require('../models/geo.city.js')

/**
 *   Возвращает выборку городов по части названия
 */
exports.autocompliteCityName = (req, res) => {
	var q = req.body.q
	// var lang = req.body.lang ? 'ru' : 'en'
	modelGeoCity
		.find({
			'title.en': { $regex: '^' + q, $options: 'i' },
		})
		// .populate('country') // select ONLY field code from country collection
		.populate('country')
		.exec() // callback run
		.then(cities => {
			console.log(cities)
			// console.log(cities.length)
			// формирование необходимого ответа
			var arr = []
			cities.forEach(city => {
				// console.log(city)
				arr.push({
					code: city.code,
					title: String(city.title.en)
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

exports.autocompliteAgregateCity = (req, res) => {
	var q = req.body.q
	// var lang = req.body.lang ? 'ru' : 'en'
	modelGeoCity
		.find({
			'title.en': { $regex: '^' + q, $options: 'i' },
		})
		.populate('country_ref')
		.exec()
		.then(cities => {
			var arr = []
			cities.forEach(city => {
				arr.push({
					code: city.code,
					title: String(city.title.en)
						.concat(', ')
						.concat(city.country_ref.title.en),
				})
				console.log(arr)
			})
			res.send(arr)
		})
		.catch(err => {
			res.status(500).send({
				message: err.message,
			})
		})
}
