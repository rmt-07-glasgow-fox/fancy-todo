const Axios = require('axios')

class PublicAPIController {
    static async headlineNewsIndonesia(req, res, next) {
        try {
            let URL = 'http://newsapi.org/v2/top-headlines?country=id&apiKey='
            let APIKEY = process.env.NEWS_API_KEY

            let response = await Axios.get(URL + APIKEY)
            // console.log(response)

            return res.json(response.data.articles)
        } catch (err) {
            console.log(err)
            return next(err)
        }
    }

    static async newsCategory(req, res, next) {
        try {
            let APIKEY = process.env.NEWS_API_KEY
            let category = req.params.category
            // business entertainment health science sports technology
            let URL = `http://newsapi.org/v2/top-headlines?country=id&category=${category}&apiKey=${APIKEY}`

            console.log('>>> category : ', category)
            console.log('>>> URL : ', URL)

            let response = await Axios.get(URL)
            // console.log(response)

            return res.json(response.data.articles)
        } catch (err) {
            console.log(err)
            return next(err)
        }
    }

    static async covidIndonesia(req, res, next) {
        try {
            let URL = `https://covid19.mathdro.id/api/countries/ID`
            let response = await Axios.get(URL)
            // console.log(response.data)
            let sendBack = {
                confirmed: response.data.confirmed.value,
                recovered: response.data.recovered.value,
                deaths: response.data.deaths.value,
                lastUpdate: response.data.lastUpdate
            }

            return res.json(sendBack)
        } catch (err) {
            console.log(err)
            return next(err)
        }
    }

    static async covidGlobal(req, res, next) {
        try {
            let URL = `https://covid19.mathdro.id/api`
            let response = await Axios.get(URL)
            // console.log(response.data)

            let sendBack = {
                confirmed: response.data.confirmed.value,
                recovered: response.data.recovered.value,
                deaths: response.data.deaths.value,
                lastUpdate: response.data.lastUpdate,
                image: response.data.image
            }

            return res.json(sendBack)
        } catch (err) {
            // console.log(err)
            return next(err)
        }
    }
}

module.exports = PublicAPIController