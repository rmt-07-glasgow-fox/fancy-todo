const axios = require('axios')
const { response } = require('express')
const { param } = require('../routers')
class api {
    static jooks (req, res, next) {
        axios.get('http://api.icndb.com/jokes/random/12')
            .then(({ data }) => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
                console.log(err)
            })
    }
    static quotes(req, res, next) {
        axios.get('https://api.quotable.io/random', {
            params: {
                minLength: 220
            }
        })
            .then(({ data }) => {
                console.log(data)
                res.send(data)
            })
            .catch(err => {
                next(err)
            })
    }

}
module.exports = api