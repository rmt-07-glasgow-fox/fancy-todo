const axios = require('axios');

class WeatherController {

    static getWeather = (req, res, next) => {
        axios.get('https://ibnux.github.io/BMKG-importer/cuaca/501212.json')
        .then(output => {
            res.status(200).json(output.data);
        })
        .catch(err => next(err));
    }
    static getLocation = (req, res, next) => {
        axios.get('https://ibnux.github.io/BMKG-importer/cuaca/wilayah.json')
        .then(output => {
            res.status(200).json(output.data.map(out => {
                return {
                    id: out.id,
                    kota: out.kota
                }
            }));
        })
        .catch(err => next(err));
    }
// }
    static getWeatherOther = (req, res, next) => {
        const id = req.params.id;
        axios.get('https://ibnux.github.io/BMKG-importer/cuaca/'+ id +'.json')
        .then(output => {
            res.status(200).json(output.data);
        })
        .catch(err => next(err))
    }
}

module.exports = WeatherController;
