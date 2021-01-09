const axios = require('axios')


class calendarController {
    static getCalendar(req, res, next){
        axios.get('https://calendarific.com/api/v2/holidays', {
            params : {
                api_key : '7c8411b089b499d0a18b199f3529038f47184a49',
                country : 'ID',
                year : 2021
            }
        }).then(data => {
            res.status(200).json(data.data.response)
        }).catch(err => {
            next(err)
        })
    }
}




module.exports = calendarController