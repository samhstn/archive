var registerUser = require('../db/registerUser.js');

exports.register = function (server, options, next) {
  server.route([
    {
      method: 'POST',
      path: '/api/register',
      config: {
        description: 'post endpoint for registering',
        handler: function (request, reply) {
          var pool = server.app.pool;
          var username = request.payload.username;
          var password = request.payload.password;

          if (request.headers['content-type'] !== 'application/json') {
            return reply('Incorrect headers, application/json needed').code(400);
          }

          if (typeof username === 'undefined') {
            return reply(
              'undefined username from payload: '
              + JSON.stringify(request.payload)).code(400);
          }

          if (typeof password === 'undefined') {
            return reply(
              'undefined password from payload: '
              + JSON.stringify(request.payload)).code(400);
          }

          registerUser(server.app.pool, username, password, function (data) {
            reply(data);
          });
        }
      }
    }
  ]);

  return next();
};

exports.register.attributes = { name: 'Registration' };
