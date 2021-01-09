const axios = require('axios')

class ApiController{
    static showData(req, res){
        const WEATHER_API_KEY = process.env.WEATHER_API_KEY
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Jakarta&appid=${WEATHER_API_KEY}`
        axios.get(weatherUrl)
        .then(response => {
            // console.log(response)
            // const weatherData = response.data
            // let jakartaWeather = response.data.weather.map(e => ({
            //     id: e.id,
            //     weather: e.main,
            //     description: e.description
            // }))
            res.status(200).json(response.data)
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = ApiController