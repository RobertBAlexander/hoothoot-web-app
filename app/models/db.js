/**
 * Created by Robert Alexander on 16/10/2017.
 */
'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//let dbURI = 'mongodb://hoothootuser:secret@ds121565.mlab.com:21565/hoothoot-web';
let dbURI = 'mongodb://localhost/hoot';
if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGODB_URI;
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
  if (process.env.NODE_ENV != 'production') {
    var seeder = require('mongoose-seeder');
    const data = require('./data.json');
    const Hoot = require('./hoot');
    const User = require('./user');
    seeder.seed(data, { dropDatabase: false, dropCollections: true }).then(dbData => {
      console.log('preloading Test Data');
      console.log(dbData);
    }).catch(err => {
      console.log(error);
    });
  }
});

mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});
