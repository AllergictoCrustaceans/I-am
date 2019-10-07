const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

//
//DOUBLE CHECK
//
const User = mongoose.model('Users', UserSchema, 'Users');

module.exports = User;