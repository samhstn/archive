var bcrypt = require('bcrypt');

function storeUser (client, done, username, password, cb) {
  bcrypt.hash(password, 3, function (_, hash) {
    client.query(
      'insert into user_table (username, password) values ($1,$2)',
      [username, hash],
      function () {

        done();
        return cb('Username: ' + username + ' stored');
      }
    );
  });
}

function _available (data, username) {
  function mapUsername (row) { return row && row.username; }

  return data.rows.map(mapUsername).indexOf(username) > -1;
}

function getUser (client, done, username, cb) {
  client.query('select username from user_table', function (_, res) {
    if (_available(res, username)) {
      done();
      return cb(false);
    };

    cb(true);
  });
}

module.exports = function (pool, username, password, cb) {
  pool.connect(function (_, client, done) {
    getUser(client, done, username, function (available) {
      if (!available) {
        done();
        return cb('Username: ' + username + ' is not available');
      }

      storeUser(client, done, username, password, function (data) {
        done();
        cb(data);
      });
    });
  });
};
