const axios = require('axios')

class ApiController {
    static getNews(req, res, next) {
        axios.get('http://newsapi.org/v2/top-headlines?country=id&apiKey=67d9ee672bb34baeb86ce111851fa3eb')
        .then(news => {
            // console.log(news.data.articles)
            res.status(200).json(news.data.articles)
        })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports = { ApiController }