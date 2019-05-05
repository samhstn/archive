var bcrypt = require('bcrypt');

module.exports = function (pool, username, password, cb) {
  pool.connect(function (dbError, client, done) {
    client.query('select username from user_table', function (err1, names) {
      if (
        names.rows.map(function (row) {
          return row && row.username;
        }).indexOf(username) === -1
        ) {
        done();
        return cb({
          data: false,
          message: 'Username: ' + username + ' is not registered'
        });
      };

      client.query(
        'select password from user_table where username=$1',
        [username],
        function (_, data) {
          var user_password = data.rows[0].password;

          bcrypt.compare(password, user_password, function (_, res) {
            done();
            if (res) {
              return cb({
                data: true,
                message: 'Logging in'
              });
            }

            return cb({
              data: false,
              message: 'Incorrect password'
            });
          });
        }
      );
    });
  });
};
