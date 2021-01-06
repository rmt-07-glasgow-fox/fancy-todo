const axios = require('axios')
class Controller {
  static getQuotes(req, res, next) {
    const options = {
      method: 'GET',
      url: 'https://quotes15.p.rapidapi.com/quotes/random/',
      headers: {
        'x-rapidapi-key': process.env.api_key,
        'x-rapidapi-host': process.env.api_host
      }
    };
    axios.request(options)
    .then((response) => {
      let out = {
        quote: response.data.content,
        from: response.data.originator.name
      }
      res.status(200).json(out);
    })
    .catch((err) => {
      next({ code: 400, msg: 'Api Error'})
    });
  }
}

module.exports = Controller 