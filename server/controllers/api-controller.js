const axios = require('axios')

class ApiController{
    static fetchWeather (req, res, next) {
        let url = "http://api.openweathermap.org/data/2.5/weather"
        let options = {
            q: 'Jakarta',
            weather: process.env.OW_API
        }
        axios.get(url, options)
            .then(response => {
                res.status(200).json({
                    response
                })
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = ApiController