const fs = require('fs')
const mongoose = require('mongoose')
const config = require('../../config/db')

mongoose
	.connect(config.path, config.options)
	.then(() => {
		console.log('db connect')

		require('../../models/geo.country.js')
		require('../../models/geo.region.js')
		const modelGeoCountry = mongoose.model('GeoCountry')
		const modelGeoRegion = mongoose.model('GeoRegion')

		fs.readFile('./data/regions.json', 'utf8', (err, data) => {
			if (err) {
				console.error(err.message)
				return false
			}

			const jsonData = JSON.parse(data)

			if (!jsonData.length) {
				console.log('array regions.json empty')
				return
			}

			// const countries = {}
			jsonData.forEach(async region => {
				const geoCountry = await modelGeoCountry.findOne({ country: Number(region.country_id) })
				// console.log(geoCountry._id)

				const itemGeoRegion = new modelGeoRegion({
					region: Number(region.region_id),
					country_ref: geoCountry._id,
					country: Number(region.country_id),
					title: {
						ru: String(region.title_ru),
						ua: String(region.title_ua),
						be: String(region.title_be),
						en: String(region.title_en),
						es: String(region.title_es),
						pt: String(region.title_pt),
						de: String(region.title_de),
						fr: String(region.title_fr),
						it: String(region.title_it),
						pl: String(region.title_pl),
						ja: String(region.title_ja),
						lt: String(region.title_lt),
						lv: String(region.title_lv),
						cz: String(region.title_cz),
					},
				})

				await itemGeoRegion
					.save()
					.then(res => console.log('region id=' + region.region_id, 'save success'))
					.catch(err => console.error(err))
			})
		})
		console.log('Load success')
		return
	})
	.catch(err => {
		console.log('Can not connect to the database' + err)
	})
