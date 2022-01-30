require("../models/weather.icon.js");
require("../models/weather.condition.js");
const { WeatherIcon } = require('../models/weather.icon')
const { WeatherCondition } = require('../models/weather.condition')
const mongoose = require("mongoose");
const config = require("../config/db");

const  WEATHER_CONDITION = [
  { code: 200, main: "Thunderstorm", description: "thunderstorm with light rain", icon: "11" },
  { code: 201, main: "Thunderstorm", description: "thunderstorm with rain", icon: "11" },
  { code: 202, main: "Thunderstorm", description: "thunderstorm with heavy rain", icon: "11" },
  { code: 210, main: "Thunderstorm", description: "light thunderstorm", icon: "11" },
  { code: 211, main: "Thunderstorm", description: "thunderstorm", icon: "11" },
  { code: 212, main: "Thunderstorm", description: "heavy thunderstorm", icon: "11" },
  { code: 221, main: "Thunderstorm", description: "ragged thunderstorm", icon: "11" },
  { code: 230, main: "Thunderstorm", description: "thunderstorm with light drizzle", icon: "11" },
  { code: 231, main: "Thunderstorm", description: "thunderstorm with drizzle", icon: "11" },
  { code: 232, main: "Thunderstorm", description: "thunderstorm with heavy drizzle", icon: "11" },
  { code: 300, main: "Drizzle", description: "light intensity drizzle", icon: "09" },
  { code: 301, main: "Drizzle", description: "drizzle", icon: "09" },
  { code: 302, main: "Drizzle", description: "heavy intensity drizzle", icon: "09" },
  { code: 310, main: "Drizzle", description: "light intensity drizzle rain", icon: "09" },
  { code: 311, main: "Drizzle", description: "drizzle rain", icon: "09" },
  { code: 312, main: "Drizzle", description: "heavy intensity drizzle rain", icon: "09" },
  { code: 313, main: "Drizzle", description: "shower rain and drizzle", icon: "09" },
  { code: 314, main: "Drizzle", description: "heavy shower rain and drizzle", icon: "09" },
  { code: 321, main: "Drizzle", description: "shower drizzle", icon: "09" },
  { code: 500, main: "Rain", description: "light rain", icon: "10" },
  { code: 501, main: "Rain", description: "moderate rain", icon: "10" },
  { code: 502, main: "Rain", description: "heavy intensity rain", icon: "10" },
  { code: 503, main: "Rain", description: "very heavy rain", icon: "10" },
  { code: 504, main: "Rain", description: "extreme rain", icon: "10" },
  { code: 511, main: "Rain", description: "freezing rain", icon: "13" },
  { code: 520, main: "Rain", description: "light intensity shower rain", icon: "09" },
  { code: 521, main: "Rain", description: "shower rain", icon: "09" },
  { code: 522, main: "Rain", description: "heavy intensity shower rain", icon: "09" },
  { code: 531, main: "Rain", description: "ragged shower rain", icon: "09" },
  { code: 600, main: "Snow", description: "light snow", icon: "13" },
  { code: 601, main: "Snow", description: "Snow", icon: "13" },
  { code: 602, main: "Snow", description: "Heavy snow", icon: "13" },
  { code: 611, main: "Snow", description: "Sleet", icon: "13" },
  { code: 612, main: "Snow", description: "Light shower sleet", icon: "13" },
  { code: 613, main: "Snow", description: "Shower sleet", icon: "13" },
  { code: 615, main: "Snow", description: "Light rain and snow", icon: "13" },
  { code: 616, main: "Snow", description: "Rain and snow", icon: "13" },
  { code: 620, main: "Snow", description: "Light shower snow", icon: "13" },
  { code: 621, main: "Snow", description: "Shower snow", icon: "13" },
  { code: 622, main: "Snow", description: "Heavy shower snow", icon: "13" },
  { code: 701, main: "Mist", description: "mist", icon: "50" },
  { code: 711, main: "Smoke", description: "Smoke", icon: "50" },
  { code: 721, main: "Haze", description: "Haze", icon: "50" },
  { code: 731, main: "Dust", description: "sand/ dust whirls", icon: "50" },
  { code: 741, main: "Fog", description: "fog", icon: "50" },
  { code: 751, main: "Sand", description: "sand", icon: "50" },
  { code: 761, main: "Dust", description: "dust", icon: "50" },
  { code: 762, main: "Ash", description: "volcanic ash", icon: "50" },
  { code: 771, main: "Squall", description: "squalls", icon: "50" },
  { code: 781, main: "Tornado", description: "tornado", icon: "50" },
  { code: 800, main: "Clear", description: "clear sky", icon: "01" },
  { code: 801, main: "Clouds", description: "few clouds: 11-24%", icon: "02" },
  { code: 802, main: "Clouds", description: "scattered clouds: 25-50%", icon: "03" },
  { code: 803, main: "Clouds", description: "broken clouds: 51-84%", icon: "04" },
  { code: 804, main: "Clouds", description: "overcast clouds: 85-100%", icon: "04" }
];

mongoose
  .connect(config.path, config.options)
  .then(res => {
    console.log("SUCCESS db connect")
  })
  .catch(err => {
    console.log("ERROR db connect", err)
  });

const modelWeatherIcon = mongoose.model("WeatherIcon");
const modelWeatherCondition = mongoose.model("WeatherCondition");

modelWeatherIcon
  .find({})
  .then( icons => {
    var iconsCodes = [];
   
    icons.forEach(icon => {
      iconsCodes[icon.code] = icon._id
    })
      
    WEATHER_CONDITION.forEach((condition, index) => {
      
      var itemWeatherCondition = new modelWeatherCondition({
        code: condition.code,
        main: condition.main,
        description: condition.description,
        icon: iconsCodes[condition.icon]
      });

      itemWeatherCondition
        .save()
        .then( res => {
          console.log("SUCCESS load icon data")
        })
        .catch( err => {
          console.error("ERROR load icon data", err)
        });

    });
    
  });
  
  



