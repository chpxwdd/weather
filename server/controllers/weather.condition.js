const modelWeatherCondition = require('../models/weather.condition.js')

exports.findOne = (req, res) => {
  modelWeatherCondition
    .findBy({ id: req.params.id })
    .then(condition => {
      res.send(condition)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message,
      })
    })
}
