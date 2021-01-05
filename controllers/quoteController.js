const axios = require('axios')
class Controller {
  static getQuotes(req, res) {
    const options = {
      method: 'GET',
      url: 'https://quotes15.p.rapidapi.com/quotes/random/',
      headers: {
        'x-rapidapi-key': 'd9e58a47afmsha8e154b7d6f4db2p1dcacejsnd0e0d02cdf04',
        'x-rapidapi-host': 'quotes15.p.rapidapi.com'
      }
    };
    axios.request(options)
      .then((response) => {
      res.send(response.data);
      })
      .catch((err) => {
      res.send(err);
      });
  }
}



module.exports = Controller 