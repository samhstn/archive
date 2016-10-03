var pg = require('pg');
var test = process.env.NODE_ENV === 'test';
var dbUrl = test ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;

if (!process.env.NOT_HEORKU) {
  console.log('for herokes: ', process.env.NOT_HEROKU, pg.defaults.ssl);
  pg.defaults.ssl = true;
}

exports.register = function (server, options, next) {
  var client = new pg.Client(dbUrl);
  client.connect();
  server.app.client = client;

  next();
};

exports.register.attributes = { name: 'dbConfig' };
