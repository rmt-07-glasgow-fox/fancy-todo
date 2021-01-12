const axios = require('axios')
// const { response } = require('express')

module.exports = class Controller {
    static getJoke(req, res) {
        const apiUrl = "https://official-joke-api.appspot.com/random_joke"
        axios.get(apiUrl)
        .then( response => {
            return res.status(200).json({
                msg: "welcome",
                setup: `${response.data.setup}`,
                punchline: `${response.data.punchline}`
            })
        } )
        .catch( error => {
            return res.status(500).json({
                msg: error.message
            })
        } )
    }
}