module.exports = function(app) {
  const controllerWeatherCountry = require('../controllers/weather.country.js')
  app.get('/api/weather/country', controllerWeatherCountry.findAll)
}
