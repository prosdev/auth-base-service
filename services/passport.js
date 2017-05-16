const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config');

//Set up options for JWT Strategies
const jwtOptions = {};

//Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    //See if user id in payload exists in our db
    //If it does call done() with that user
    //Otherwise call done() without user object
    User.findById(payload.sub, function (err, user) {
        if (err) { return done(err, false); }

        if(user) {
            done(null, user);
        } else {
            done(null, false);
        }
    })
});

//Tell Passport to use strategy