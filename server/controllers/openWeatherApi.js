const axios = require('axios').default;

class openWeatherApi {
  static showData(req, res) {
    const WEATHER_API_KEY = process.env.WEATHER_API_KEY
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Jakarta&appid=${WEATHER_API_KEY}`
    axios.get(weatherUrl)
      .then(response => {
        console.log(response)
        let currentWeather = response.data.weather.map(el => ({
          id: el.id,
          weather: el.main,
          description: el.description
        }))
        res.send(currentWeather)
      })
      .catch(err => {
        res.send(err)
      })
  }
}

module.exports = openWeatherApi;