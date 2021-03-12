const express = require("express");
const shortid = require("shortid");
const validUrl = require("valid-url");
const Url = require("./url");

var shortUrlRoute = express.Router();

shortUrlRoute = async (req, res)=>{
    console.log(req.body)
    const longUrl = req.body.url;
    const user_id = req.body.user_id;
    const title = req.body.title;
    const desc = req.body.description;
    let troll = req.body.troll;

    const baseUrl = "https://xd0m3.eu/s"

    const urlCode = shortid.generate();

    if(validUrl.isUri(longUrl)){

        try{
            var url = await Url.findOne({longUrl : longUrl});
            if(url){
                res.status(200).json({code: "already-created", url: url})
            }else{

                const shortUrl = baseUrl + "/" + urlCode;
                url  = new Url({
                    title,
                    desc,
                    longUrl,
                    shortUrl,
                    urlCode,
                    troll,
                    user_id,
                    clickCount: 0
                });
                
                await url.save()
                res.status(201).json({code: "created", url: url})
            }
        }catch(err){
            return res.status(500).json( {message:"Internal Server error " + err.message});
        }
    }else{
        res.status(400).json({message: "Invalid URL. Please enter a vlaid url for shortening."});
    }    
}

module.exports = shortUrlRoute;