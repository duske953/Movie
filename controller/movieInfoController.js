const axios = require("axios");

async function getSimilarMovies(type, id) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`
  );
  return response.data;
}

exports.movieInfo = async (req, res) => {
  let foundMovie, similarMovies;
  try {
    const movieType = req.originalUrl.split("/")[1];

    const response = await axios.get(
      `https://api.themoviedb.org/3/${movieType}/${req.params.id}?api_key=${process.env.API_KEY}&language=en-US&append_to_response=videos,credits`
    );
    foundMovie = { ...response.data };
    if (movieType === "movie")
      similarMovies = await getSimilarMovies(movieType, req.params.id);
    if (movieType === "tv")
      similarMovies = await getSimilarMovies(movieType, req.params.id);
    // res.send(foundMovie);
    // if (!foundMovie.backdrop_path)
    //   throw new Error("we could not find that movie");
    res.render("Movieinfo", { foundMovie, similarMovies, movieType });
  } catch (err) {
    res.render("err", { err: "We could not find the movie you requested" });
  }
};
