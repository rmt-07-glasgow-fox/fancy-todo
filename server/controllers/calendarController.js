const axios = require('axios')

const getCalendar = (req,res) => {
    let calendarIndoUrl = "https://date.nager.at/Api/v1/Get/ID/2020"

    axios.get(calendarIndoUrl)
    .then(response => {
        console.log(response.data);
        let result = response.data.map(el => {
            return {
                day: el.localName,
                date: el.date
            }
        })
        console.log(result);
        res.send(response.data)
    })
    .catch(err => {
        res.send(err)
    })
}

module.exports = { getCalendar }