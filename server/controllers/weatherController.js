const axios = require("axios")

class weatherController {
  static getAll(req, res, next) {
    const access_key = '97cbb2fa27a3e62f1c058a823083e8a9'
    const city = 'Bogor'
    
    axios.get(`http://api.weatherstack.com/current?access_key=${access_key}&query=${city}`)
      .then(response => {
        const apiResponse = response.data;
        // res.send(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
        // res.send(apiResponse)
        let weather = {
          location: apiResponse.location.name,
          temperature: apiResponse.current.temperature,
          image: apiResponse.current.weather_icons[0],
          cuaca: apiResponse.current.weather_descriptions[0]
        }
        res.status(200).json(weather)
      }).catch(err => {
        next(err)
      });
  }
}

module.exports = weatherController

