const express = require('express');
const router = express.Router();

//Register
router.get('/register', (req, res, next) => {
    res.send('REGISTER');
});

//Authentication
router.post('/authentication', (req, res, next) => {
    res.send('AUTHENTICATION');
});

//Profile
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});

//Validation
router.get('/validation', (req, res, next) => {
    res.send('VALIDATION');
});

module.exports = router;