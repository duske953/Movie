const express = require("express");
const Router = express.Router();
const homeController = require("../controller/homeController");

Router.route("/").get(homeController.getHomePage);

module.exports = Router;
