const express = require("express");
const shortid = require("shortid");
const validUrl = require("valid-url");
const Url = require("./url");

var shortUrlRoute = express.Router();

shortUrlRoute = async (req, res)=>{
    console.log(req)
    const longUrl = req.body.longUrl;
    let troll = req.body.troll;
    if(troll == "on"){
        troll = true;
    } else {
        troll = false;
    }
    const baseUrl = "https://xd0m3.eu/s"

    const urlCode = shortid.generate();

    if(validUrl.isUri(longUrl)){

        try{
            var url = await Url.findOne({longUrl : longUrl});
            if(url){
                return  res.render("url", url);
            }else{

                const shortUrl = baseUrl + "/" + urlCode;
                url  = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    troll,
                    clickCount: 0
                });
                
                await url.save()
                return res.render("url", url);
            }
        }catch(err){
            console.error(err.message);
            return res.status(500).json("Internal Server error " + err.message);
        }
    }else{
        res.status(400).json("Invalid URL. Please enter a vlaid url for shortening.");
    }    
}

module.exports = shortUrlRoute;