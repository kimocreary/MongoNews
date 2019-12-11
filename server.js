var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

axios.get("https://www.npr.org/").then(function(response) {

  var $ = cheerio.load(response.data);

  var results = [];

  $("h4.headline-link").each(function(i, element) {

    var title = $(element).text();

    var link = $(element).parent().attr("href");

    results.push({
      title: title,
      link: link
    });
  });
  console.log(results);
});



var db = require("./models");

var app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });










app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });