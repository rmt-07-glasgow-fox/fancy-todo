const axios = require('axios');
const API_KEY = process.env.API_KEY

class MovieController {
    static getMovie (req, res, next) {
        axios.get(`
        https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${req.body.search}&page=1&include_adult=true`)
            .then((data) => {
                res.status(200).json(data.data);
            })
            .catch((err) => {
                next({ code: 500 });
            });
    }

    static popular (req, res, next) {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
            .then((data) => {
                res.status(200).json(data.data);
            })
            .catch((err) => {
                next({ code: 500 });
            });
    }

    static topRated (req, res, next) {
        axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
            .then((data) => {
                res.status(200).json(data.data);
            })
            .catch((err) => {
                next({ code: 500 });
            });
    }
}

module.exports = MovieController;