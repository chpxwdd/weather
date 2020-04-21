const WEATHER_ICON = [
  {code:"01",description:"clear sky"},
  {code:"02",description:"few clouds"},
  {code:"03",description:"scattered clouds"},
  {code:"04",description:"broken clouds"},
  {code:"09",description:"shower rain"},
  {code:"10",description:"rain"},
  {code:"11",description:"thunderstorm"},
  {code:"13",description:"snow"},
  {code:"50",description:"mist"}
]

const mongoose = require("mongoose");
const config = require("../config/db");

mongoose
  .connect(config.path, config.options)
  .then(() => {
    console.log("db connect");
  })
  .catch(err => {
    console.log("Can not connect to the database" + err);
  });

const { WeatherIcon } = require('../models/weather.icon')
const modelWeatherIcon = mongoose.model("WeatherIcon");

WEATHER_ICON.forEach((icon, index) => {
  var itemWeatherIcon = new modelWeatherIcon({
    code: icon.code,
    description: icon.description,
  });
  itemWeatherIcon
    .save()
    .then( res => {
      console.log("SUCCESS load icon data")
    })
    .catch( err => {
      console.error("ERROR load icon data", err)
    });
});