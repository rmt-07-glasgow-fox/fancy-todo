const axios = require('axios');

class WeatherController {   
    static currentWeather(req, res, next) {
        let baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
        let option = {
            params: {
                lat: req.body.location.latitude,
                lon: req.body.location.longitude,
                appid: process.env.API_KEY_WEATHER,
                units: 'metric'
            }
        }
        
        axios.get(baseUrl, option)
            .then(response => {
                res.status(200).json({
                    id: response.data.id,
                    appid: process.env.API_KEY_WEATHER
                })
            })
            .catch(err => {
                console.log(err);
                next(err)
            })
    }
}

module.exports = WeatherController;