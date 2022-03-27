const axios = require('axios').default;
const { to } = require('../libs/to/to');

const getMovies = async (req, res, next) => {
  console.log("'/test' call");
  try {
    const data = await axios.get(
      `https://imdb-api.com/en/API/MostPopularMovies/k_u2bjnbvi`
    );
    res.status(201).json(data.data);
  } catch (err) {
    next(err);
  }
};

const getMovieById = async (req, res, next) => {
  try {
    const data = await axios.get(
      `https://imdb-api.com/en/API/Title/k_u2bjnbvi/${req.params.movieId}`
    );
    res.status(201).json(data.data);
  } catch (err) {
    next(err);
  }
};

const searchMovie = async (req, res, next) => {
  try {
    const data = await axios.get(
      `https://imdb-api.com/en/API/Search/k_u2bjnbvi/${req.body.name}`
    );
    res.status(201).json(data.data);
  } catch (err) {
    next(err);
  }
};

exports.getMovies = getMovies;
exports.getMovieById = getMovieById;
exports.searchMovie = searchMovie;
