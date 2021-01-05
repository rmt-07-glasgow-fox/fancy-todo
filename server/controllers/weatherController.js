const fetch = require('node-fetch')

class weatherController {

    static getWeather(req,res,next){   
        const query = {
            lat:"-6.9067536",
            lon:"107.70381979999999"
        }
        // console.log(navigator);
        let url = 'https://community-open-weather-map.p.rapidapi.com/weather?q=bandung,id'
        fetch(url, {
            headers : {
                "x-rapidapi-key": "3a6b37c02dmsh1bad73073dcc94cp171845jsncad9d6e6c78d",
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