var bcrypt = require('bcrypt');

exports.register = function (server, options, next) {
  server.route([
    {
      method: 'POST',
      path: '/api/register',
      config: {
        description: 'post endpoint for registering',
        handler: function (request, reply) {
          var client = server.app.client;
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

          client.query('select username from user_table', function (_, res1) {
            if (
              res1.rows.map(function (row) {
                return row && row.username;
              }).indexOf(username) > -1
              ) {
              return reply('Username: ' + username + ' is not available');
            };

            bcrypt.hash(password, 3, function (_, hash) {
              client.query(
                'insert into user_table (username, password) values ($1,$2)',
                [username, hash],
                function () {

                  return reply('Username: ' + username + ' stored');
                }
              );
            });
          });
        }
      }
    }
  ]);

  return next();
};

exports.register.attributes = { name: 'Registration' };
