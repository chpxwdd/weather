const fs = require('fs')
const mongoose = require('mongoose')
const config = require('../../config/db')
mongoose
	.connect(config.path, config.options)
	.then(() => {
		console.log('db connect')

		fs.readFile('./data/countries.json', 'utf8', (err, data) => {
			if (err) {
				throw err
			}

			const jsonData = JSON.parse(data)

			if (!jsonData.length) {
				console.log('array countries.json empty')
				return
			}

			require('../../models/geo.country.js')
			const modelGeoCountry = mongoose.model('GeoCountry')
			jsonData.forEach(country => {
				const itemGeoCountry = new modelGeoCountry({
					country: Number(country.country_id),
					title: {
						ru: !country.title_ru ? null: String(country.title_ru),
						ua: !country.title_ua ? null: String(country.title_ua),
						be: !country.title_be ? null: String(country.title_be),
						en: !country.title_en ? null: String(country.title_en),
						es: !country.title_es ? null: String(country.title_es),
						pt: !country.title_pt ? null: String(country.title_pt),
						de: !country.title_de ? null: String(country.title_de),
						fr: !country.title_fr ? null: String(country.title_fr),
						it: !country.title_it ? null: String(country.title_it),
						pl: !country.title_pl ? null: String(country.title_pl),
						ja: !country.title_ja ? null: String(country.title_ja),
						lt: !country.title_lt ? null: String(country.title_lt),
						lv: !country.title_lv ? null: String(country.title_lv),
						cz: !country.title_cz ? null: String(country.title_cz),
					},
				})
				itemGeoCountry
					.save()
					.then(res => console.log('Save success id=' + country.country_id))
					.catch(err => console.error(err.message))
			})
			console.log('Load success')
			return
		})
	})
	.catch(err => {
		console.log('Can not connect to the database' + err)
	})
