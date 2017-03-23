'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    user : String,
    pass : String
});

module.exports = mongoose.model('User', UserSchema);

