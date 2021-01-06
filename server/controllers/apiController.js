const axios = require('axios')

class APIController {
    static getRandomJoke(req, res) {
        axios.get('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json',
            }
        })
            .then(response => {
                // console.log(response)
                let data = response.data.joke
                res.status(200).json(data)
            })
            .catch(err => {
                // console.log(err)
                // res.status(500).json({ message: 'Internal Server Error' })
                next(err)
            })
    }

}

module.exports = APIController