const axios = require("axios")

class WeatherController{
  static getWeather (req, res, next) {
    // let API_KEY = 'bde52af97fc634d147f196b57238568a'
    let API_KEY = process.env.API_KEY
    console.log(API_KEY)
    let weatherStackUrl = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=Jakarta`
    axios.get(weatherStackUrl)
    .then(response => {
      // console.log(response.dat)
      let city = response.data.location.name
      let observation_time = response.data.current.observation_time
      let temperature = `${response.data.current.temperature}° celcius`
      let data = {
        city,
        observation_time,
        temperature
      }
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = WeatherController