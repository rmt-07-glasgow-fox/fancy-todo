const Axios = require('axios')

class PublicAPIController {
    static async headlineNewsIndonesia(req, res) {
        try {
            let URL = 'http://newsapi.org/v2/top-headlines?country=id&apiKey='
            let APIKEY = process.env.NEWS_API_KEY

            let response = await Axios.get(URL + APIKEY)
            // console.log(response)

            return res.send(response.data.articles)
        } catch (err) {
            console.log(err)
            return res.status(500).send(err)
        }
    }

    static async newsCategory(req, res) {
        try {
            let APIKEY = process.env.NEWS_API_KEY
            let category = req.params.category
            // business entertainment health science sports technology
            let URL = `http://newsapi.org/v2/top-headlines?country=id&category=${category}&apiKey=${APIKEY}`

            console.log('>>> category : ', category)
            console.log('>>> URL : ', URL)

            let response = await Axios.get(URL)
            // console.log(response)

            return res.send(response.data.articles)
        } catch (err) {
            console.log(err)
            return res.status(500).send(err)
        }
    }

    static async covidIndonesia(req, res) {
        try {
            let URL = `https://covid19.mathdro.id/api/countries/ID`
            let response = await Axios.get(URL)
            console.log(response)

            return res.send(response.data)
        } catch (err) {
            // console.log(err)
            return res.status(500).send(err)
        }
    }

    static async covidGlobal(req, res) {
        try {
            let URL = `https://covid19.mathdro.id/api`
            let response = await Axios.get(URL)
            console.log(response)

            return res.send(response.data)
        } catch (err) {
            // console.log(err)
            return res.status(500).send(err)
        }
    }
}

module.exports = PublicAPIController