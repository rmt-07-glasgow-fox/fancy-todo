const axios = require('axios')

class Controller{
    static getHolidays (req, res, next){
        let holidaysApiUrl = `https://calendarific.com/api/v2/holidays?api_key=${process.env.API_KEY}&country=ID&year=2021`
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