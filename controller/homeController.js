const axios = require('axios');

function getMovies(type, category, page) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/${type}/${category}?api_key=${process.env.API_KEY}&language=en-US&page=${page}`
      );
      resolve(response.data);
    } catch (err) {
      reject(err.message);
    }
  });
}

exports.getHomePage = async (req, res) => {
  let movies = [];
  let trendingMovies = [];
  let trendingSeries = [];
  try {
    movies.push(await getMovies('movie', 'popular', 1));
    movies.push(await getMovies('tv', 'popular', 1));

    trendingMovies.push(await getMovies('movie', 'now_playing', 2));
    trendingSeries.push(await getMovies('tv', 'on_the_air', 1));
    res.render('home', { movies, trendingMovies, trendingSeries });
  } catch (err) {
    res.render('err', { err: 'Something went wrong' });
  }
};
