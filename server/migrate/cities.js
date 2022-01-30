require("../models/weather.country.js");

/**
 *
 * RUN this command from current file location
 *    node --max-old-space-size=8192 cities.js
 */

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

const modelWeatherCountry = mongoose.model("WeatherCountry");

modelWeatherCountry.find({}).then(countries => {
  var countryCodes = [];
  countries.forEach(country => {
    countryCodes[country.code] = country._id;
  });

  require("fs").readFile("./cities.json", "utf8", (err, data) => {
    const cities = JSON.parse(data);

    if (!cities.length) {
      return;
    }

    require("../models/weather.city.js");
    const modelWeatherCity = mongoose.model("WeatherCity");

    cities.forEach((city, index) => {
      if (!city.name) {
        return;
      }

      var itemWeatherCity = new modelWeatherCity({
        code: city.id,
        name: city.name,
        country: countryCodes[String(city.country).toLowerCase()],
        coord: city.coord
      });
      itemWeatherCity.save();
    });
  });
});

// node --max-old-space-size=16384 cities.js
