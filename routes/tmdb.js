const express = require('express');
const { searchMovie, getMovieData, getTVData } = require('../api/tmdb');
const router = express.Router();

router.get('/id', async function (req, res, next) {
  const { query } = req.query;

  const data = await searchMovie(query);

  res.send(data);
});

router.get('/tv', async function (req, res, next) {
  const { id, season = 0 } = req.query;

  const data = await getTVData(id, season);

  res.send(data);
});

router.get('/movie', async function (req, res, next) {
  const { id } = req.query;

  const data = await getMovieData(id);

  res.send(data);
});

module.exports = router;
