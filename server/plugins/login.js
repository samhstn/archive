var loginUser = require('../db/loginUser.js');

exports.register = function (server, options, next) {
  server.route([
    {
      method: 'POST',
      path: '/api/login',
      config: {
        description: 'post endpoint for loggin in',
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

          loginUser(server.app.pool, username, password, function (res) {
            if (res.data) {
              return reply({
                message: res.message,
                data: true
              }).state('login', { user: username });
            }

            return reply({
              message: res.message,
              data: false
            }).code(401);
          });
        }
      }
    }
  ]);

  return next();
};

exports.register.attributes = { name: 'Login' };
