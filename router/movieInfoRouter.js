const express = require("express");
const Router = express.Router();
const movieInfoController = require("../controller/movieInfoController");

Router.route("/:id").get(movieInfoController.movieInfo);

module.exports = Router;
