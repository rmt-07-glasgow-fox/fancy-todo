const axios = require('axios')

class ApiController {

  // Watherbit API
  static getWeather(req, res, next) {
    let key = process.env.WEATHERBIT_API
    let apiUrl = `http://api.weatherbit.io/v2.0/current?city=Jakarta,ID&key=${key}`

    axios.get(apiUrl)
    .then((response) => {

      const currentWeather = {
        timezone: response.data.data[0].timezone,
        city_name: response.data.data[0].city_name,
        date: response.data.data[0].datetime,
        temp: response.data.data[0].temp,
        description: response.data.data[0].weather.description,
        icon: response.data.data[0].weather.icon
      }
      res.status(200).json(currentWeather)
    })
    .catch((error) => {
      console.log(error);
      next(error)
    })
  }

}

module.exports = {ApiController}
