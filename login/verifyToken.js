const path = require('path');
const express = require("express");
const User = require("./user");

const jwt = require("jsonwebtoken");

verifyToken = async (req, res) => {
    console.log(req.query, req.query["token"], req.query.token);
    let token = req.query["token"]
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
            if(decoded === undefined) {
                res.status(403).json({message: "Invalid token"})
                return;
            }
            let user = await User.find({_id: decoded.id})
            if(user) {
                res.status(200).json({message: "Token verified", user: user[0], token: token})
            } else {
                res.status(403).json({message: "Invalid token"})
            }
        });
    } else {
        res.status(404).json({message: "No Token present!"})
    }
}

module.exports = verifyToken;
