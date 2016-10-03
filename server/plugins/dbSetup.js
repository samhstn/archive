var pg = require('pg');
var config = require('../dbConfig.js');

exports.register = function (server, options, next) {
  var pool = new pg.Pool(config);
  server.app.pool = pool;

  next();
};

exports.register.attributes = { name: 'dbConfig' };
