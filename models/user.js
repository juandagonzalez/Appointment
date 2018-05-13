const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database')

//User schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    }
})

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback){
    User.findById(id, callback);
}

module.exports.addUser = function (newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt,(err,hash) =>{
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserById = function (id, callback){
    User.findById(id, callback);
}