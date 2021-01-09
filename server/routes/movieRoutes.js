const express = require('express');
const { authentication, authorization } = require('../middlewares/auth');
const MovieController = require('../controllers/moviesController');
const movieRoutes = express.Router();

movieRoutes.use(authentication);

movieRoutes.get('/', MovieController.popular);
movieRoutes.post('/find', MovieController.getMovie);
movieRoutes.get('/top', MovieController.topRated);

module.exports = movieRoutes;