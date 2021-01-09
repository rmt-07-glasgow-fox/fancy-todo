const axios = require('axios')

class ApiController {
    static getHolidays(req, res, next) {
        axios.get('https://calendarific.com/api/v2/id?api_key=')
        .then(data => {
            console.log(data)
            res.send('masuk')
        })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports = { ApiController }