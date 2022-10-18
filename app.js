require("dotenv").config();
const express = require("express");
const compression = require("compression");
const minifyHTML = require("express-minify-html");
const app = express();
const xss = require("xss-clean");
const homeRouter = require("./router/homeRouter");
const movieInfoRouter = require("./router/movieInfoRouter");
const searchMovieRouter = require("./router/searchMovieRouter");

app.use(xss());

app.use(compression());
app.use(
  minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      minifyJS: false,
    },
  })
);
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use("/", homeRouter);
app.use(["/movie", "/tv"], movieInfoRouter);
app.use("/search", searchMovieRouter);
app.use(function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("working");
});
