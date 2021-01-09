const axios = require('axios');

class QuoteController {
    static getQuote(req, res, next) {
        const baseUrl = 'https://healthruwords.p.rapidapi.com/v1/quotes/';
        const option = {
            headers: {
                'x-rapidapi-key': process.env.API_KEY_QUOTE,
                'x-rapidapi-host': 'healthruwords.p.rapidapi.com'
            },
            params: {
                "t": "Wisdom",
                "size": "medium"
            }
        }

        axios.get(baseUrl, option)
            .then(response => {
                let quote = response.data[0]
                res.status(200).json(quote)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = QuoteController