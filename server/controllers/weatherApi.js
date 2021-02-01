const axios = require('axios');

class weatherApi {
  static postCurrentWeather(req, res, next) {
    const city = req.body.city
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`

    axios.get(baseUrl)
      .then(function (response) {
        // handle success
        res.status(200).json(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }
}

module.exports = weatherApi;