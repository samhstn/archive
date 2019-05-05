var tape = require('tape');
var server = require('../../server/server.js');

['/', '/login', '/register'].forEach(function (endpoint, i) {
  var prefix = '#' + (3 * i + 1) + ',' + (3 * i + 2) + ',' + (3 * i + 3);
  tape(prefix + ' GET :: ' + endpoint, function (t) {
    server.inject({ method: 'GET', url: endpoint }, function (res) {
      t.equal(res.statusCode, 200, 'status code of 200');
      t.equal(
        res.headers['content-type'],
        'text/html; charset=utf-8',
        'html headers'
      );
      t.ok(res.payload.indexOf('<!doctype') !== -1, 'containts html');
      t.end();
    });
  });
});

tape('#10,11,12 GET :: /riot', function (t) {
  server.inject({ method: 'GET', url: '/riot+compiler.min.js' }, function (res) {
    t.equal(res.statusCode, 200, 'status code of 200');
    t.equal(
      res.headers['content-type'],
      'application/javascript; charset=utf-8',
      'javascript headers'
    );
    t.ok(res.payload.indexOf('riot') !== -1, 'contains riot module');
    t.end();
  });
});

tape('#13,14,15 GET :: /resource/{*param}', function (t) {
  server.inject({ method: 'GET', url: '/resource/tags/home.js' }, function (res) {
    t.equal(res.statusCode, 200, 'status code of 200');
    t.equal(
      res.headers['content-type'],
      'application/javascript; charset=utf-8',
      'javascript headers'
    );
    t.ok(res.payload.indexOf('Home View') !== -1, 'home component');
    t.end();
  });
});

tape.onFinish(function () {
  server.stop();
});
