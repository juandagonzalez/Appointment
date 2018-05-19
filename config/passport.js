const passportJWT = require("passport-jwt");
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

        User.getUserById(jwt_payload._doc._id, (err,user) =>{
            
            if(err){
                return done(err, false);
            }

            if(user){
                return done(null, true);
            } else{
                return done(null, false);
            }

        });
    }));
}