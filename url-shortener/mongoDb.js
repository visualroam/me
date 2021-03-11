const mongoose = require("mongoose");

let url = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORT}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`

const connectDB = async () => {
    try{
        await mongoose.connect(url, { useNewUrlParser: true, dbName: "xd0m3"});
        console.log("Connected to DB");
    }catch(err){
        console.error(err.message);
    }
}

module.exports = connectDB;