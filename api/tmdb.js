const { Tmdb } = require('tmdb');

const apiKey = '88c5a8ad5e5356dc541bd7aa5743955f';
const moviedb = new Tmdb(apiKey);

async function searchMovie(query) {
  return await moviedb.get('search/multi', { query });
}

async function getTVData(id, seasonOrder) {
  const info = await moviedb.get(`tv/${id}`);
  const images = await moviedb.get(`tv/${id}/images`);

  const backdrops = images.backdrops.map(
    (path) => `https://www.themoviedb.org/t/p/original${path.filePath}`
  );
  const posters = images.posters.map(
    (path) => `https://www.themoviedb.org/t/p/original${path.filePath}`
  );
  const { name, genres, overview, originalName, firstAirDate } = info;
  const seasonNumber = info.seasons[seasonOrder].seasonNumber;
  const season = await moviedb.get(`tv/${id}/season/${seasonNumber}`);

  return {
    id,
    name,
    episodes: season.episodes.map((episode) => episode.name),
    backdrops,
    posters,
    genres,
    overview,
    originalName,
    firstAirDate,
  };
}

async function getMovieData(id) {
  const info = await moviedb.get(`movie/${id}`);
  const images = await moviedb.get(`movie/${id}/images`);

  const backdrops = images.backdrops.map(
    (path) => `https://www.themoviedb.org/t/p/original${path.filePath}`
  );
  const posters = images.posters.map(
    (path) => `https://www.themoviedb.org/t/p/original${path.filePath}`
  );
  const { name, genres, overview, originalName, firstAirDate } = info;
  return {
    id,
    name,
    backdrops,
    posters,
    genres,
    overview,
    originalName,
    firstAirDate,
  };
}

module.exports = {
  searchMovie,
  getTVData,
  getMovieData,
};
