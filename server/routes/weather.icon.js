module.exports = function(app) {
  const controllerWeatherIcon = require('../controllers/weather.icon.js')
  app.get('/api/weather/icon/:code', controllerWeatherIcon.findOne)
}
