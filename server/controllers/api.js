const axios = require("axios");
const nameSplit = require("../helpers/nameSplit");
const { NEWS_API_KEY } = process.env;

class ApiController {
  static news(req, res, next) {
    // return res.send("masuk weather")

    axios
      .get('http://newsapi.org/v2/top-headlines?' +
      'country=id&' +
      `apiKey=${NEWS_API_KEY}`)
      .then(({ data }) => {
        res.send(data.articles.slice(0,5));
      })
      .catch((err) => {
        next(err)
      });
  }

  static quote(req, res, next) {
    // res.send("masuk joke")
    let quote;
    let { firstName, lastName } = nameSplit(req.user.fullName);
    axios
      .get(
        `http://api.icndb.com/jokes/random?firstName=${firstName}&lastName=${lastName}`
        // `http://api.icndb.com/jokes/random?escape=javascript&firstName=${firstName}&lastName=${lastName}`
      )
      .then(({ data }) => {
        quote = data.value.joke;
        res.status(200).send({ quote });
      })
      .catch((err) => {
        next(err)
      });
  }
}

module.exports = ApiController;
