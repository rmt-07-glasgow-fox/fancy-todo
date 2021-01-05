const axios = require("axios").default

class CovidController {
  static getLive (req, res) {
    // let baseUrl = "https://covid-api.mmediagroup.fr/v1/cases"
    let indonesiaUrl = "https://covid-api.mmediagroup.fr/v1/cases?country=Indonesia"
    axios.get(indonesiaUrl)
    .then(response => {
      let data = response.data.All
      res.send({
        Confirmed: data.confirmed,
        Recovered: data.recovered,
        Deaths: data.deaths,
      })
    })
    .catch(err => {
      res.send({err})
    })
  }
}

module.exports = CovidController