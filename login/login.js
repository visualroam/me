const path = require('path');
const express = require("express");
const User = require("./user");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");

loginRoute = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password
    let user = await User.findOne({ email: email });
    if(user){
        await bcrypt.compare(password, user.password, function(err, match) {
            if(match) {
                let token = jwt.sign({email: user.email, admin: user.admin, id: user._id}, process.env.JWT_SECRET, { expiresIn: '36000s' });
                res.status(200).json({code: 200, message: "User found and password matched!", payload: token})
            } else {
                res.status(403).json({code: 403, message: "Passwort doesnt match!"})
            }
        });
    } else {
        res.status(404).json({code: 404, message: "User not found!"})
    }
}

module.exports = loginRoute;
