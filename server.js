const express = require('express');
const path = require('path');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const passport = ('passport');
const mongoose = ('mongoose');
const config = require('./config/database');

//Connect to database
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log('connected to database'+config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('error connecting to database'+err);
});

const app = express();

const users = require('./routes/users');

//port number
var port = 8000;

//CORS middleware
app.use(cors());

//Body parser middleware
app.use(bodyParser.json());

app.use('/users',users);

//Index route
app.get('/',(req, res)=>{
    res.send('Index working')
});

//Setup static files
app.use (express.static(__dirname + "/public"));

app.listen(port);