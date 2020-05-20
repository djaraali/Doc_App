const mongoose = require('mongoose');

const user = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    firstname: { type: String },
    lastname: { type: String },
    profile: { type: String },
    about: { type: String },
    specialist: { type: String },
});

module.exports = mongoose.model('User', user);

