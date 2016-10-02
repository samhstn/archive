var Inert = require('inert');
var Vision = require('vision');
var register = require('./register.js');
var login = require('./login.js');
var dbSetup = require('./dbSetup.js');

module.exports = [
  Inert,
  Vision,
  register,
  login,
  dbSetup
];
