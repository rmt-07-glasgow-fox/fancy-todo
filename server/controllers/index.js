const UserController = require('./user');
const TodoController = require('./todo');
// const axios = require('axios').default;
// const OPENWEATHER_APIKEY = process.env.OPENWEATHER_APIKEY;

class Controller {
  static getRootHandler(req, res) {
    res.send('Hi there! this home of fancy-todo APP')
    //   let weather;

    //   const options = {
    //     method: "GET",
    //     url: "https://community-open-weather-map.p.rapidapi.com/weather",
    //     weatherParams: {
    //       q: "Jakarta, Indonesia",
    //       lat: "0",
    //       lon: "0",
    //       id: "2172797",
    //       lang: "null",
    //       units: "metric",
    //       mode: "",
    //     },
    //     headers: {
    //       "x-rapidapi-key": OPENWEATHER_APIKEY,
    //       "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
    //     },
    //   };

    //   axios
    //     .request(options)
    //     .then(({
    //       data
    //     }) => {
    //       weather = data;
    //     })
    //   return res.status(200).json({
    //       weather: {
    //         weather: weather.weather,
    //         main: weather.main,
    //         city: weather.name
    //       },
    //     })
    //     .catch(err => {
    //       next(err);
    //     })
  }

}

module.exports = {
  Controller,
  UserController,
  TodoController
};