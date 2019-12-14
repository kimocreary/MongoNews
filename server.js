var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models/index");

var PORT = process.env.PORT || 9999;

var app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true});


// axios.get("https://www.npr.org/").then(function(response) {

//   var $ = cheerio.load(response.data);

//   var results = [];

//   $("div.story-text").each(function(i, element) {

//     var title = $(this).find("h3").text().trim()

//     var link = $(this).find("a").attr("href")

//     results.push({
//       title: title,
//       link: link
//     });
//   });
//   console.log(results);

  
// });




app.get("/scrape",function(req, res) {
  console.log('hit')
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
 
});
});


app.get("/allArticles", function(req, res){

db.Articles.find({}).then(function(records){
  res.send(records)
})
.catch(function(err) {

    console.log(err);
  });
  
})

app.get("/articles/:id", function(req, res) {

  db.Article.findOne({ _id: req.params.id })

  .populate("Notes")

  .then(function(dbArticle) {
   
    res.json(dbArticle);
  })
  .catch(function(err) {

    res.json(err);
    
  });
});







app.listen(PORT,function(){
  console.log("app is listening on PORT", PORT)
})









