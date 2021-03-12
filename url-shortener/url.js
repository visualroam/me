
const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    title: String,
    description: String,
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    troll: Boolean,
    user_id: String,
    clickCount: Number
});

module.exports = mongoose.model("url", urlSchema);
