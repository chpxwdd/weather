/**
 *
 * RUN this command from current file location
 *    node --max-old-space-size=8192 countries.js
 */

const mongoose = require('mongoose')
const config = require('../config/db')

mongoose
  .connect(config.path, config.options)
  .then(res => {
    console.log('Connect to the database succes')
  })
  .catch(err => {
    console.log('Can not connect to the database' + err)
  })

const fs = require('fs')
const { WeatherCountry } = require('../models/weather.country')

const _countries = JSON.parse(fs.readFileSync('./countries.json', 'utf8'))
const countriesData = JSON.parse(fs.readFileSync('./iso-3166-1.json', 'utf8'))
const external = countriesData['Results']
const countries =  _countries.items;

if (countries.length && external) {
  const modelWeatherCountry = mongoose.model('WeatherCountry')

  countries.forEach((country, i) => {
    var code = String(country.code).toUpperCase();
    console.log("iterate ", i);
    console.log("country ", country);
    
    console.log("code ", code);
    var weatherCountry = new modelWeatherCountry({
      code: country.code,
      name: external[code]['Name'],
      names: external[code]['Names'],
      capital: external[code]['Capital'] ? external[code]['Capital']['Name'] : null,
      notes: external[code]['Notes'],
      geo_point: external[code]['GeoPt'],
      geo_rect: external[code]['GeoRectangle'],
    })

    weatherCountry.save()
  })
}
