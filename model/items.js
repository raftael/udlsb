'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an object that shows
//the shape of your database entries.
var ItemSchema = new Schema({
  type: String,
  month: String,
  detail: {
      info: {
          description: String,
          image: String,
          file: String
      },
      items:[
          {
              title: String,
              description: String,
              phone: String,
              mail: String,
              file: String
          }
      ]
  }
});

//export our module to use in server.js
module.exports = mongoose.model('Item', ItemSchema);
