const axios = require("axios");

const jokes = async (req, res, next) => {
  const getJokes = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"
  
   await axios.get(getJokes)
  .then(joke => {
    console.log(joke);
    if (joke.data.setup === 1) {
      res.send(joke.data.joke)
    } else {
      res.send(joke.data.setup)
    }
  })
  .catch(err => {
    next(err)
  })
}

module.exports = {
  jokes
}
