var tape = require('tape');
var pg = require('pg');
var dbConfig = require('../../server/dbConfig.js');

var server = require('../../server/server.js');
var pool = server.app.pool;

var flushDb = require('../helpers/flushDb.js')(pool);
var register = require('../helpers/register.js')(server);

tape('#16,17 POST :: /api/register with incorrect content-type header', function (t) {
  flushDb(function () {
    var payload = {
      username: 'testUser',
      password: 'testPass'
    };

    var opts = {
      method: 'POST',
      url: '/api/register',
      payload: JSON.stringify(payload)
    };

    server.inject(opts, function (res) {
      t.equal(res.statusCode, 400);
      t.equal(
        res.payload,
        'Incorrect headers, application/json needed'
      );
      t.end();
    });
  });
});

tape('#18,19 POST :: /api/register with undefined username', function (t) {
  flushDb(function () {
    var payload = { password: 'testPass' };

    var opts = {
      method: 'POST',
      url: '/api/register',
      payload: payload
    };

    server.inject(opts, function (res) {
      t.equal(res.statusCode, 400);
      t.equal(
        res.payload,
        'undefined username from payload: ' + JSON.stringify(opts.payload)
      );
      t.end();
    });
  });
});

tape('#20,21 POST :: /api/register with undefined password', function (t) {
  flushDb(function () {
    var payload = { username: 'testPass' };

    var opts = {
      method: 'POST',
      url: '/api/register',
      payload: payload
    };

    server.inject(opts, function (res) {
      t.equal(res.statusCode, 400);
      t.equal(
        res.payload,
        'undefined password from payload: ' + JSON.stringify(opts.payload)
      );
      t.end();
    });
  });
});

tape('#22,23 POST :: /api/register with unavailable user', function (t) {
  flushDb(function () {
    var payload = {
      username: 'testUser',
      password: 'testPass'
    };

    var opts = {
      method: 'POST',
      url: '/api/register',
      payload: payload
    };

    server.inject(opts, function () {
      server.inject(opts, function (res) {
        t.equal(res.statusCode, 200);
        t.equal(
          res.payload,
          'Username: ' + payload.username + ' is not available'
        );
        t.end();
      });
    });
  });
});

tape('#24,25 POST :: /api/register with available user', function (t) {
  flushDb(function () {
    var payload = {
      username: 'testUser',
      password: 'testPass'
    };

    var opts = {
      method: 'POST',
      url: '/api/register',
      payload: payload
    };

    server.inject(opts, function (res) {
      t.equal(res.statusCode, 200);
      t.equal(
        res.payload,
        'Username: ' + payload.username + ' stored'
      );
      t.end();
    });
  });
});

tape('#26,27 POST :: /api/register with incorrect content-type header', function (t) {
  flushDb(function () {
    var payload = {
      username: 'testUser',
      password: 'testPass'
    };

    var opts = {
      method: 'POST',
      url: '/api/login',
      payload: JSON.stringify(payload)
    };

    register(payload, function () {
      server.inject(opts, function (res) {
        t.equal(res.statusCode, 400);
        t.equal(res.payload, 'Incorrect headers, application/json needed');
        t.end();
      });
    });
  });
});

tape('#28,29 POST :: /api/login with undefined username', function (t) {
  flushDb(function () {
    var payload = { password: 'testPass' };

    var opts = {
      method: 'POST',
      url: '/api/login',
      payload: payload
    };

    register(payload, function () {
      server.inject(opts, function (res) {
        t.equal(res.statusCode, 400);
        t.equal(res.payload, 'undefined username from payload: ' + JSON.stringify(payload));
        t.end();
      });
    });
  });
});

tape('#30,31 POST :: /api/login with undefined password', function (t) {
  flushDb(function () {
    var payload = { username: 'testUser' };

    var opts = {
      method: 'POST',
      url: '/api/login',
      payload: payload
    };

    register(payload, function () {
      server.inject(opts, function (res) {
        t.equal(res.statusCode, 400);
        t.equal(res.payload, 'undefined password from payload: ' + JSON.stringify(payload));
        t.end();
      });
    });
  });
});

tape('#32,33 POST :: /api/login with unregistered user', function (t) {
  flushDb(function () {
    var payload = {
      username: 'testUser',
      password: 'testPass'
    };

    var opts = {
      method: 'POST',
      url: '/api/login',
      payload: payload
    };

    server.inject(opts, function (res) {
      t.equal(res.statusCode, 401);
      t.equal(JSON.parse(res.payload).message, 'Username: ' + payload.username + ' is not registered');
      t.end();
    });
  });
});

tape('#34,35,36 POST :: /api/login with incorrect password', function (t) {
  flushDb(function () {
    var payload1 = {
      username: 'testUser',
      password: 'testPass'
    };

    var payload2 = {
      username: 'testUser',
      password: 'notTestPass'
    };

    var opts = {
      method: 'POST',
      url: '/api/login',
      payload: payload2
    };

    register(payload1, function () {
      server.inject(opts, function (res) {
        t.equal(res.statusCode, 401);
        t.equal(JSON.parse(res.payload).message, 'Incorrect password');
        t.equal(JSON.parse(res.payload).data, false);
        t.notOk(res.headers['set-cookie']);
        t.end();
      });
    });
  });
});

tape('#37,38,39 POST :: /api/login with correct login credentials', function (t) {
  flushDb(function () {
    var payload = {
      username: 'testUser',
      password: 'testPass'
    };

    var opts = {
      method: 'POST',
      url: '/api/login',
      payload: payload
    };

    register(payload, function () {
      server.inject(opts, function (res) {
        t.equal(res.statusCode, 200);
        t.equal(JSON.parse(res.payload).message, 'Logging in');
        t.equal(JSON.parse(res.payload).data, true);
        t.ok(res.headers['set-cookie']);
        t.end();
      });
    });
  });
});

tape.onFinish(function () {
  flushDb(function () {
    pool.end()
  });
});
