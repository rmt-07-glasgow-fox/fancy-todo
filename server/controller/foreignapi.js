const axios = require('axios').default

class Controller {

  static getCurrentWeather (req, res) {
    const url = 'https://community-open-weather-map.p.rapidapi.com/weather'
    const options = {
      params: {
        q: 'jakarta,indonesia',
        units: 'metric',
        //mode: 'html'
      },
      headers: {
        'x-rapidapi-key': '7b78d7dbd4msh8983698c57f1265p17b7a7jsne27600500f22',
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
      }
    }

    axios.get(url, options)
    .then(response => {
      console.log('response axios')
      console.log(response.data, '<<< response')
      res.status(200).json(response.data)
    })
    .catch(err => {
      console.log('axios error')
      console.log(err, '<<< err')
      res.status(400).send(err)
    })
  }
}

module.exports = Controller;