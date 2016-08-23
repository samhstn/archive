const Hapi = require('hapi');
const port = process.env.PORT || 3333;
const host = process.env.HOST || 'localhost';

const plugins = require('./plugins/index.js');
const routes = require('./routes/index.js');

const server = new Hapi.Server();

server.connection({
  host,
  port
});

server.register(plugins, (err) => {
  if (err)
    throw err;

  server.route(routes);
});

