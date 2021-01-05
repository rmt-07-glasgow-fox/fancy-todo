const axios = require('axios')

class ApiController{
    static getNews(req, res, next){
        const api_key = process.env.API_KEY
        const url = `http://newsapi.org/v2/top-headlines?country=id&category=technology&apiKey=${api_key}`
        axios.get(url)
        .then(response => {
            res.status(200).json(response.data)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ApiController