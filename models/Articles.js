var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title:{
        type: String,
        require: true
    },
    link:{
        type: String,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    saved: {
        type: Boolean,
        default: false,
    }
})

var Articles = mongoose.model("Articles", articleSchema)

module.exports = Articles;