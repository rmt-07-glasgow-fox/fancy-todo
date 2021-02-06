const axios = require('axios');
const yesterday = require('../helpers/yesterday');

class WeatherController {

    static getWeather = (req, res, next) => {
        axios.get('https://ibnux.github.io/BMKG-importer/cuaca/501212.json')
        .then(output => {
            output.data = output.data.slice(0,4);
            res.status(200).json(output.data);
        })
        .catch(err => next(err));
    }

}

module.exports = WeatherController;
