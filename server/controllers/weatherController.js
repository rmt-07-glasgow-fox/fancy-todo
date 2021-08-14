const axios = require('axios')

function getWeather (req,res,next){
    let {lat,lon} = req.query
    const url = 'https://api.openweathermap.org/data/2.5/weather'
    axios.get(url,{
        params:{
            lat,
            lon,
            appid:process.env.API_KEY_WEATHER
        }
    })
    .then(response=>{
        res.status(200).json(response.data)
    })
    .catch(next)
}

module.exports = getWeather