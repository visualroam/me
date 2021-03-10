var express = require('express');
var app = express();
var fs = require('fs')
const path = require('path');
var cors = require('cors');
const bodyParser = require('body-parser')

/*ENV VARIABLES*/
require('dotenv').config();

const connectDB = require("./url-shortener/mongoDb");

let shortUrlRoute = require('./url-shortener/newShortUrl')
let getShortUrlRoute = require('./url-shortener/shortUrl')
let loginRoute = require('./login/login');

var http = require('http').createServer(app)

app.use(express.json({}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('error_pages'));
app.use(express.static('dist'))
app.use(express.static('build'))

app.use('/uploads',  express.static(__dirname + '/uploads'))
app.use("/assets",express.static(__dirname + '/assets'));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/url-shortener/views"));
app.use(cors());

connectDB();

/* INSERT ALL URLS HERE */
const router = express.Router()

router.get

router.post("/login", loginRoute)

router.get("/", function (req,res) {
    res.sendFile(path.join(__dirname+'/dist/index.html'))
})

router.post("/url/new",  shortUrlRoute)

router.get("/url", function(req,res) {
    res.sendFile(path.join(__dirname+'/url-shortener/url.html'));
})

router.get("/nora", function(req,res) {
    res.sendFile(path.join(__dirname+"/nora.html"))
})

router.get("/data/nora", function(req,res) {
    let end = {};

    let a1 = [];
    let a2 = [];

    let url = "https://xd0m3.eu/nora"

    for(let i = 0; i < 5000; i++){
        a1.push(rnd(a1,a2));
        a2.push(rnd(a1,a2));
    }

    a1[Math.floor(Math.random() * 5000)] =  410;
    a2[Math.floor(Math.random() * 5000)] =  410;

    end["url"] = url;
    end["common"] = a2.filter(function(obj) { 
        return a1.indexOf(obj) != -1; 
    });
    end["a1"] = a1;
    end["a2"] = a2;

    setTimeout(() => {
        res.json(end);
    },2000)
});

router.get("/s/:shortUrl", getShortUrlRoute);
/* END */
/*router.get("/routes",function (req, res) {
    res.status(200).json(router.stack);
})*/
app.use('', router)

app.use(function (req, res) {
    res.sendFile(path.join(__dirname+'/error_pages/404.html'));
})

http.listen(8443, function(){
    console.log('listening on *:8443');
  });

function rnd(a1,a2) {
    let r = Math.floor(Math.random() * 20000) + 1;
    if(a1.find(e => e == r) != undefined || a2.find(e => e == r) != undefined || r == 410) {
        r = rnd(a1,a2)
    }
    return r;
}
