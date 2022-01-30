const fs = require('fs')
const JSONStream = require('JSONStream')
const mongoose = require('mongoose')
const config = require('../../config/db')

mongoose
	.connect(config.path, config.options)
	.then(() => {
		console.log('db connect')

		require('../../models/geo.city.js')
		require('../../models/geo.country.js')
		require('../../models/geo.region.js')

		const modelGeoCity = mongoose.model('GeoCity')
		const modelGeoCountry = mongoose.model('GeoCountry')
		const modelGeoRegion = mongoose.model('GeoRegion')

		fs.createReadStream('./data/cities.json')
			.pipe(JSONStream.parse('*'))
			.on('data', city => {
				const geoCountry = modelGeoCountry.findOne({ country: city.country_id })
				geoCountry
					.exec()
					.then(function(country) {
						modelGeoRegion
							.findOne({ region: city.region_id })
							.exec()
							.then(function(region) {
								const itemGeoCity = new modelGeoCity({
									city: Number(city.city_id),
									country: Number(city.country_id),
									country_ref: country._id,
									important: Boolean(city.important),
									region: !region ? null : city.region_id,
									region_ref: !region ? null : region._id,
									title: {
										ru: !city.title_ru ? null : String(city.title_ru),
										ua: !city.title_ua ? null : String(city.title_ua),
										be: !city.title_be ? null : String(city.title_be),
										en: !city.title_en ? null : String(city.title_en),
										es: !city.title_es ? null : String(city.title_es),
										pt: !city.title_pt ? null : String(city.title_pt),
										de: !city.title_de ? null : String(city.title_de),
										fr: !city.title_fr ? null : String(city.title_fr),
										it: !city.title_it ? null : String(city.title_it),
										pl: !city.title_pl ? null : String(city.title_pl),
										ja: !city.title_ja ? null : String(city.title_ja),
										lt: !city.title_lt ? null : String(city.title_lt),
										lv: !city.title_lv ? null : String(city.title_lv),
										cz: !city.title_cz ? null : String(city.title_cz),
									},
									area: {
										ru: !city.area_ru ? null : String(city.area_ru),
										ua: !city.area_ua ? null : String(city.area_ua),
										be: !city.area_be ? null : String(city.area_be),
										en: !city.area_en ? null : String(city.area_en),
										es: !city.area_es ? null : String(city.area_es),
										pt: !city.area_pt ? null : String(city.area_pt),
										de: !city.area_de ? null : String(city.area_de),
										fr: !city.area_fr ? null : String(city.area_fr),
										it: !city.area_it ? null : String(city.area_it),
										pl: !city.area_pl ? null : String(city.area_pl),
										ja: !city.area_ja ? null : String(city.area_ja),
										lt: !city.area_lt ? null : String(city.area_lt),
										lv: !city.area_lv ? null : String(city.area_lv),
										cz: !city.area_cz ? null : String(city.area_cz),
									},
									region: {
										ru: !city.region_ru ? null : String(city.region_ru),
										ua: !city.region_ua ? null : String(city.region_ua),
										be: !city.region_be ? null : String(city.region_be),
										en: !city.region_en ? null : String(city.region_en),
										es: !city.region_es ? null : String(city.region_es),
										pt: !city.region_pt ? null : String(city.region_pt),
										de: !city.region_de ? null : String(city.region_de),
										fr: !city.region_fr ? null : String(city.region_fr),
										it: !city.region_it ? null : String(city.region_it),
										pl: !city.region_pl ? null : String(city.region_pl),
										ja: !city.region_ja ? null : String(city.region_ja),
										lt: !city.region_lt ? null : String(city.region_lt),
										lv: !city.region_lv ? null : String(city.region_lv),
										cz: !city.region_cz ? null : String(city.region_cz),
									},
								})

								itemGeoCity
									.save()
									.then(res => console.log('Save SUCCESS id=' + city.city_id))
									.catch(err => console.error(err.message))
							})

							.catch(function(err) {
								console.log(err)
							})
					})
					.catch(function(err) {
						console.log(err)
					})
			})

		console.log('Load success')

	})
	.catch(err => {
		console.log('Can not connect to the database' + err)
	})
