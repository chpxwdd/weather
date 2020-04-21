const modelWeatherIcon = require('../models/weather.icon.js')

exports.findOne = (req, res) => {
  modelWeatherIcon
    .findBy({ code: req.params.code })
    .then(icon => {
      res.send(icon)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message,
      })
    })
}
