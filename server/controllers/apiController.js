const axios = require('axios')

class ApiController {
    static getWeather(req, res, next) {
        const apiKey = process.env.WEATHER_API_KEY
        const unit = "metric";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=jakarta&appid=${apiKey}&units=${unit}`;
        axios({
            method: 'GET',
            url: url,
        })
        .then(result => {
            res.status(200).json(result.data)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ApiController