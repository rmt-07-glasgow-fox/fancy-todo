const axios = require('axios')


class NewsControl {
    static getData (req, res) {
        let newsUrl = `http://api.mediastack.com/v1/news?access_key=${process.env.SECRET_API}&categories=technology`
        
        axios.get(newsUrl)
        .then (response => {
            // let data = response
            let data = response.data.data.map(news => {
                return {
                    title: news.title,
                    description: news.description,
                    source: news.source,
                    published: news.published_at,
                    url: news.url
                }
            })
            res.status(200).json(data)
        })
        .catch (err => {
            res.send(err)
        })
    }
}

module.exports = NewsControl