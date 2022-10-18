const axios = require("axios");
async function fetchData(search) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_KEY}&language=en-US&page=1&include_adult=false&query=${search}`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
}

exports.searchMovie = async (req, res, next) => {
  try {
    let data = await fetchData(req.query.title);
    data = data.results.map((movies) => {
      return {
        poster_path: movies.poster_path,
        movieType: movies.media_type,
        original_name: movies.name ? movies.name : movies.title,
        vote_average: movies.vote_average,
        id: movies.id,
      };
    });
    if (!data || data.length === 0 || data[0].movieType === "person")
      throw new Error("movie not found");
    res.render("Search", { data, searchTitle: req.query.title });
  } catch (err) {
    res.render("err", {
      err: `No results matching your search "${req.query.title}"`,
    });
  }
};
