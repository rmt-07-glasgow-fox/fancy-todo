const axios = require("axios").default

class CovidController{
    static getLiveReport (req, res) {
    let covidStat = "https://covid-api.mmediagroup.fr/v1/cases?country=Indonesia"
    axios.get(covidStat)
    .then(response => {
      let data = response.data.All
      res.status(200).json({
        confirmed: data.confirmed,
        recovered: data.recovered,
        deaths: data.deaths,
      })
    })
    .catch(err => {
      res.send({err})
    })
  }
}

module.exports = {CovidController}