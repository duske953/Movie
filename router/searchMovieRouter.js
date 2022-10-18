const express = require("express");
const Router = express.Router();
const searchMovieController = require("../controller/searchMovieController");

Router.route("/").get(searchMovieController.searchMovie);
module.exports = Router;
