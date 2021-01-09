const axios = require('axios')

class Controller{
    static getCalendar(req, res, next){
        axios.get('https://calendarific.com/api/v2/holidays', {
            params : {
                api_key : 'b2d238fa68a6d1e31842c9cf68f7be3d96ee3951',
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

module.exports = Controller