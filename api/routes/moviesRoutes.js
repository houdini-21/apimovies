const express = require('express');
const router = express.Router();
const middlewares = require('../libs/middleware/auth');
const moviesHttp = require('../controllers/movies');

router.route('/').get(middlewares.protectWithJwt, moviesHttp.getMovies);

router.route('/:movieId').get(middlewares.protectWithJwt, moviesHttp.getMovieById);

router.route('/search').post(middlewares.protectWithJwt, moviesHttp.searchMovie)

exports.router = router;
