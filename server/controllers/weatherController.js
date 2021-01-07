const fetch = require('node-fetch')

class weatherController {

    static getWeather(req,res,next){   
        const { lat, lon } = req.params

        let url = `https://community-open-weather-map.p.rapidapi.com/weather?lat=${lat}&lon=${lon}&units=metric`
        fetch(url, {
            headers : {
                "x-rapidapi-key": process.env.RAPID_API_KEY,
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                "useQueryString": true
            }  
        },next)
            .then(result => result.json())
            .then(data => {
                if(data.cod == 200) res.status(200).json(data)
                else next({name:'errorNotFound'}) 
            })
            .catch(err => next(err))
    }
}

module.exports = weatherController