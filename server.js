var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = process.env.PORT ||3000;

var app = express();




axios.get("https://www.npr.org/").then(function(response) {

  var $ = cheerio.load(response.data);

  var results = [];

  $("div.story-text").each(function(i, element) {

    var title = $(this).find("h3").text().trim()

    var link = $(this).find("a").attr("href")

    results.push({
      title: title,
      link: link
    });
  });
  console.log(results);

  // insert all of the records in the database
});





app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

app.get("/",function(req, res) {

  axios.get("https://www.npr.org/").then(function(response) {

  var $ = cheerio.load(response.data);

  var results = [];

  $("div.story-text").each(function(i, element) {

    var results = ""
    var title = $(this).find("h3").text().trim()

    var link = $(this).find("a").attr("href")

    results = {
      title: title,
      link: link
    };
    db.Articles.create(results)
  });
  console.log(results);

  res.redirect("/allArticles")
  // insert all of the records in the database
});
});
app.get("/allArticles", function(req, res){

db.Articles.find({}).then(function(records){
  res.send(records)
})
  
})

app.listen(PORT,function(){
  console.log("app is listening on PORT", PORT)
})









