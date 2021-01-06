const axios = require('axios');

class APIController {
  static getLocation(req, res) {
    // TODO: GEOLOCATION API
  };

  static getWeather(req, res) {
    // Hardcode Location
    let location = 'Banten';
    const openWeatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHER_API_KEY}`

    axios.get(openWeatherAPIURL)
      .then(response => {
        let weather = response.data.weather.map(e => e.main);
        let output = {
          city: response.data.name,
          weather: weather[0],
          temp: `${Math.round((response.data.main.temp) - 273.1)}°C` // change from kelvin to degrees
        };
        res.send(output);
      })
      .catch(err => res.send(err));
  };

  static async getAnimeList(req, res, next) {
    // try {
    //   // HARD CODE QUERY
    //   const searchQuery = 'Bang'
    //   const limitQuery = 4;

    //   const MALAPIURL = `https://api.myanimelist.net/v2/anime?q=${searchQuery}&limit=${limitQuery}`;
    //   const config = { headers: { Authorization: 'Bearer ' + process.env.MAL_API_TOKEN } };

    //   const mal = await axios.get(MALAPIURL, config);
    //   return res.json(response.data);
    // } catch (err) {
    //   next(err);
    // }

    // HARD CODE QUERY
    const searchQuery = 'Bang'
    const limitQuery = 4;

    const MALAPIURL = `https://api.myanimelist.net/v2/anime?q=${searchQuery}&limit=${limitQuery}`;
    const config = { headers: { Authorization: 'Bearer ' + process.env.MAL_API_TOKEN } };

    axios.get(MALAPIURL, config)
      .then(response => res.json(response.data))
      .catch(err => res.send(err))
  };
};

module.exports = APIController;