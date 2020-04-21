module.exports = function(app) {
  const controllerWeatherCondition = require('../controllers/weather.condition.js')
  app.get('/api/weather/condition/:id', controllerWeatherCondition.findOne)
}
