module.exports = function (server) {
  return function (payload, cb) {
    var opts = {
      method: 'POST',
      url: '/api/register',
      payload: payload
    };

    server.inject(opts, cb);
  };
};
