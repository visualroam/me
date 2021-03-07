
const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    troll: Boolean,
    clickCount: Number
});

module.exports = mongoose.model("url", urlSchema);
