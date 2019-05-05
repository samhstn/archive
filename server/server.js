require('env2')('./config.env');
var Hapi = require('hapi');
var Handlebars = require('handlebars');

var routes = require('./routes/index.js');
var plugins = require('./plugins/index.js');

var port = process.env.PORT || 5000;

var server = new Hapi.Server();

server.connection({ port: port });

server.state('login', {
  ttl: null,
  isSecure: true,
  isHttpOnly: true,
  encoding: 'base64json'
});

server.register(plugins, () => {
  server.views({
    engines: { html: Handlebars },
    relativeTo: __dirname,
    path: './view'
  });

  server.route(routes);
});

module.exports = server;
