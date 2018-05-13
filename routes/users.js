const express = require('express');
const router = express.Router();
const passport = require('passport')
const jwt = require ('jsonwebtoken')

const User = require('../model/user')

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

//Authentication
router.post('/authentication', (req, res, next) => {
    res.send('AUTHENTICATION');
});

//Profile
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});

module.exports = router;