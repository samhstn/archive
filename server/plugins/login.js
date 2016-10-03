var bcrypt = require('bcrypt');

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

          pool.connect(function (dbError, client, done) {
            client.query('select username from user_table', function (err1, names) {
              if (
                names.rows.map(function (row) {
                  return row && row.username;
                }).indexOf(username) === -1
                ) {
                done();
                return reply('Username: ' + username + ' is not registered');
              };

              client.query(
                'select password from user_table where username=$1',
                [username],
                function (_, data) {
                  var user_password = data.rows[0].password;

                  bcrypt.compare(password, user_password, function (_, res) {
                    done();
                    if (res) {
                      return reply({
                        message: 'Logging in',
                        data: true
                      }).state('login', { user: username });
                    }

                    return reply({
                      message: 'Incorrect password',
                      data: false
                    }).code(401);
                  });
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

exports.register.attributes = { name: 'Login' };
