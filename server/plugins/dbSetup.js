var pg = require('pg');
var test = process.env.NODE_ENV === 'test';
var dbUrl = test ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;

exports.register = function (server, options, next) {
  var client = new pg.Client(dbUrl);
  client.connect();
  server.app.client = client;

  next();
};

exports.register.attributes = { name: 'dbConfig' };
