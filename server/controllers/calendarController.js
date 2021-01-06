const axios = require('axios')

class Controller{
    static getHolidays (req, res, next){
        let holidaysApiUrl = "https://calendarific.com/api/v2/holidays?api_key=192704207411e2c1b69a3b2ded9ea62795bf67cd&country=ID&year=2021"
        axios.get(holidaysApiUrl)
        .then(response =>{
            let holidays = response.data.response.holidays.map(holiday =>{
                return {
                    name: holiday.name,
                    description: holiday.description,
                    date: holiday.date.iso
                }
            })
           res.status(200).json(holidays)
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = Controller