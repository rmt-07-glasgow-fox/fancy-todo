const axios = require('axios')
const CALENDARIFIC_API_KEY = process.env.CALENDARIFIC_API_KEY

class Controller {
    static getHoliday(req, res, next) {
        let calendarUrl = 'https://calendarific.com/api/v2/holidays'
        axios.get(calendarUrl, {
            params: {
                api_key: CALENDARIFIC_API_KEY,
                country: 'ID',
                year: new Date().getFullYear().toString()
            }
        })
        .then(response => {
            let holidayList = response.data.response.holidays
            res.status(200).json(holidayList)
        })
        .catch(err => next(err))
    }
}

module.exports = Controller