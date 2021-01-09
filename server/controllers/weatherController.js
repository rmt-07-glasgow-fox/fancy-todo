const axios = require('axios')

class Controller {
    static weather(req, res, next) {
        const apiKey = process.env.WEATHER_API_KEY
        let weatherAPI = `http://api.openweathermap.org/data/2.5/weather?q=Jakarta&appid=${apiKey}&units=metric`
        axios.get(weatherAPI)
        .then(response => {
            let result = [{
                city: response.data.name,
                description: response.data.weather[0].description,
                icon: response.data.weather[0].icon,
                temp: response.data.main.temp
            }]
            console.log(result);
            res.status(200).json(result[0])
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = Controller