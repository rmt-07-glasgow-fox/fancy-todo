const axios = require("axios");

const jokes = (req, res, next) => {
  const getJokes = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"
  
  axios.get(getJokes)
  .then(joke => {
    res.send(joke.data.setup)
  })
  .catch(err => {
    next(err)
  })
}

module.exports = {
  jokes
}
