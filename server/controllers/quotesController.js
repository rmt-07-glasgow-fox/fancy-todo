const axios = require("axios")

class QuotesController {
    static getQuotes (req, res, next) {
        const url = `https://bodybuilding-quotes.p.rapidapi.com/random-quote`
        const config = {
            headers: {
                "x-rapidapi-key": "d1e2435160msh552ccff37abb70bp19640fjsn2cb0edec2b1d",
                "x-rapidapi-host": "bodybuilding-quotes.p.rapidapi.com"
            }
        }

        axios.get(url, config)
            .then (response => {
                res.status(200).json(response.data)

            })
            .catch (err => {
                next(err)
            })
        // const options = {
        //     method: "GET",
        //     url: "https://bodybuilding-quotes.p.rapidapi.com/random-quote",
        //     headers
        // }
    }

}

module.exports = QuotesController