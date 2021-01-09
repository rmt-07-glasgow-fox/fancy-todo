const axios = require("axios").default;

const jokes = async (req, res, next) => {
  const getJokes = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"
  
   await axios.get(getJokes)
  .then(joke => {
    // console.log(joke);
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



const weather = async (req, res, next) => {
  var options = {
    method: 'POST',
    url: 'https://telesign-telesign-send-sms-verification-code-v1.p.rapidapi.com/sms-verification-code',
    params: {phoneNumber: '+6281215012217', verifyCode: 'null'},
    headers: {
      'x-rapidapi-key': '9c9fe255d2msh5aacb199c614de5p147e7djsn0170d974a71f',
      'x-rapidapi-host': 'telesign-telesign-send-sms-verification-code-v1.p.rapidapi.com'
    }
  };
  
  axios.request(options)
  .then(function (response) {
    // console.log(response.data);
    res.send(response.data);

  })
  .catch(function (error) {
    // console.error(error);
    res.send(error);

  });
}





module.exports = {
  jokes, weather
}
