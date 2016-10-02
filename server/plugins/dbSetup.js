var pg = require('pg');
var pgUrl = process.env.PG_URL;

exports.register = function (server, options, next) {
  var client = new pg.Client(pgUrl);
  client.connect();
  server.app.client = client;

  next();
};

exports.register.attributes = { name: 'dbConfig' };
