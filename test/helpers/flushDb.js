var fs = require('fs');
var path = require('path');
var schemaPath = path.join(__dirname, '..', '..', 'schema.sql');

module.exports = function (pool) {
  return function (cb) {
    pool.connect(function (error, client, done) {
      fs.readFile(schemaPath, 'utf8', function (err, data) {
        if (err) {
          throw new Error('Readfile Error: ' + err);
        }

        client.query(data, function () {
          done();
          cb();
        });
      });
    });
  };
}
