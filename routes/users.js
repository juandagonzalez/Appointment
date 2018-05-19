const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require ('jsonwebtoken');
const config = require ('../config/database');
const User = require('../models/user');

//Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

User.addUser (newUser, (err,user) =>{
    if(err){
        res.json({sucess: false, msg:'failed to register user'});
    } else {
        res.json({success: true, msg: 'register completed'})
    }
    });
});

//Authenticate
router.post('/authenticate', (req, res, next) => {
    const name = req.body.name;
    const password = req.body.password;

    User.getUserByName(name, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false  , msg: 'User not found'});
        };
        
        User.comparePassword (password, user.password, (err, pssMatch) => {
            if(err) throw err;
            if(pssMatch){
                const token = jwt.sign (user.toJSON(), config.secret, {
                    expiresIn: 300000
                });

                res.json({
                    success: true,
                    token: 'JWT' +token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                });
            }else {
                return res.json({success: false, msg: 'wrong password'});
            }
        });
    });
});

//Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
});

module.exports = router;