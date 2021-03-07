const path = require('path');
const express = require("express");
const Url = require("./url");

getShortenUrlRoute = async (req, res) => {
    var shortUrlCode = req.params.shortUrl;
    var url = await Url.findOne({ urlCode: shortUrlCode });
    try {
        if (url) {
            var clickCount = url.clickCount;
            clickCount++;
            await url.update({ clickCount });
            if(url.troll == true) {
                let troll_urls = [
                    "https://de.pornhub.com/",
                    "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO",
                    "https://www.youtube.com/watch?v=6n3pFFPSlW4", 
                    "https://i.imgur.com/mIaeylC.jpg", 
                    "https://stackoverflow.com/", 
                    "https://www.reddit.com/r/meme/", 
                    "https://www.youtube.com/watch?v=kffacxfA7G4", 
                    "https://www.youtube.com/watch?v=XqZsoesa55w", 
                    "https://www.youtube.com/watch?v=QPM6FFD2eCk", 
                    "https://www.youtube.com/watch?v=immrs9qGARU", 
                    "https://www.youtube.com/watch?v=yBLdQ1a4-JI", 
                    "https://www.youtube.com/watch?v=7zpxgyG7eGk", 
                    "https://www.youtube.com/watch?v=uBbwZCRIILM", 
                    "https://www.youtube.com/watch?v=AndzyIDU-kQ",
                    "https://www.youtube.com/watch?v=Lt1u6N7lueM",
                    "https://www.youtube.com/watch?v=-TcLxlkc2pA",
                    "https://www.youtube.com/watch?v=cBkWhkAZ9ds",
                    "https://www.youtube.com/watch?v=fx2Z5ZD_Rbo",
                    "https://www.youtube.com/watch?v=-50NdPawLVY"
                ]    
                //Add the real url :)
                troll_urls.push(url.longUrl)
                
                if(randomIntFromInterval(0,100) < 40) {
                    let index = randomIntFromInterval(0, troll_urls.length-1);

                    return res.render("redirect", {url: troll_urls[index]});
                } else {
                    return res.render("redirect", {url: url.longUrl});
                }
            } else {
                return res.render("redirect", {url: url.longUrl});
            }
        } else {
            return res.sendFile(path.join(__dirname+'/error_pages/404.html'));
        }
    }
    catch (err) {
        console.error("Error while retrieving long url for shorturlcode " + shortUrlCode);
        console.error(err)
        return res.sendFile(path.join(__dirname+'/error_pages/50x.html'));
    }
}

module.exports = getShortenUrlRoute;

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }