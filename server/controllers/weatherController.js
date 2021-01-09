const axios = require('axios')
require('dotenv').config()


class Weather{
    static weather(req, res, next) {
        axios({
            url: `http://api.openweathermap.org/data/2.5/weather?q=Bandung&appid=${process.env.WEATHERAPI}`
        })
        .then(data=>{
            console.log(data.data);
            let result = data.data
            let weather = {
                name: result.name,
                temp: `${Math.round((result.main.temp-273)*10)/10} °C`,
                weather: result.weather[0].main,
                description: result.weather[0].description
            }
            res.status(200).json(weather)
        })
        .catch(err=>{
            next(err)
        })
    
    }
}

module.exports = Weather