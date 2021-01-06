const axios = require('axios')

class Controller {
    static weather(req, res, next) {
        const access_key = process.env.WEATHERSTACK_API
        let city = req.body.city
        let weatherAPI = `http://api.weatherstack.com/current?access_key=${access_key}&query=${city}`
        axios.get(weatherAPI)
        .then(response => {
            if (city) {
                const location = {
                    city: response.data.location.name,
                    country: response.data.location.country,
                    region: response.data.location.region,
                }
                const weather = {
                    temperature: response.data.current.temperature,
                    weather_icons: response.data.current.weather_icons,
                    weather_descriptions: response.data.current.weather_descriptions,
                    wind_speed: response.data.current.wind_speed,
                    wind_degree: response.data.current.wind_degree,
                    wind_direction: response.data.current.wind_dir
                }
                res.status(200).json({ location, weather })
            } else {
                throw { name: "invalidQuery"}
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = Controller