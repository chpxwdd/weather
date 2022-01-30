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
						ru: !region.title_ru ? null : String(region.title_ru),
						ua: !region.title_ua ? null : String(region.title_ua),
						be: !region.title_be ? null : String(region.title_be),
						en: !region.title_en ? null : String(region.title_en),
						es: !region.title_es ? null : String(region.title_es),
						pt: !region.title_pt ? null : String(region.title_pt),
						de: !region.title_de ? null : String(region.title_de),
						fr: !region.title_fr ? null : String(region.title_fr),
						it: !region.title_it ? null : String(region.title_it),
						pl: !region.title_pl ? null : String(region.title_pl),
						ja: !region.title_ja ? null : String(region.title_ja),
						lt: !region.title_lt ? null : String(region.title_lt),
						lv: !region.title_lv ? null : String(region.title_lv),
						cz: !region.title_cz ? null : String(region.title_cz),
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
