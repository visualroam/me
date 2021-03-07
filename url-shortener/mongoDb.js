const mongoose = require("mongoose");
const db = process.env.MONGODB

const connectDB = async () => {
    try{
        await mongoose.connect(db, { useNewUrlParser: true, dbName: "urlShortener"});
        console.log("Connected to DB");
    }catch(err){
        console.error(err.message);
    }
}

module.exports = connectDB;