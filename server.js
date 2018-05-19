const express = require('express');
const path = require('path');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const passport = require('passport');
const mongoose = require ('mongoose');
const config = require('./config/database');

//Connect to database
mongoose.connect(config.databaseUrl);

mongoose.connection.on('connected', () => {
    console.log('connected to database'+config.databaseUrl);
});

mongoose.connection.on('error', (err) => {
    console.log('error connecting to database'+err);
});

const app = express();

const users = require('./routes/users');

//port number
var options = {
    host: 'localhost',
    port: 4000,
}

//CORS middleware
app.use(cors());

//Body parser middleware
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);

//Index route
app.get('/',(req, res)=>{
    res.send('Index working')
});

//Setup static files
app.use (express.static(__dirname + "/public"));

app.listen(options.port);