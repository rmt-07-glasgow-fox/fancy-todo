const axios = require('axios')
// const { response } = require('express')

module.exports = class Controller {
    static getJoke(req, res) {
        const apiUrl = "https://official-joke-api.appspot.com/jokes/programming/random"
        axios.get(apiUrl)
        .then( response => {
            return res.status(200).json({
                msg: "welcome",
                setup: `${response.data[0].setup}`,
                punchline: `${response.data[0].punchline}`
            })
        } )
        .catch( error => {
            return res.status(500).json({
                msg: error.message
            })
        } )
    }
}