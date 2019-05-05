var Joi = require('joi');

var loginUser = require('../db/loginUser.js');

exports.register = function (server, options, next) {
  server.route([
    {
      method: 'POST',
      path: '/api/login',
      config: {
        description: 'post endpoint for loggin in',
        validate: {
          headers: Joi.object({
            'content-type': Joi.string().valid('application/json').required()
          }).options({ allowUnknown: true }),
          payload: {
            username: Joi.string().required(),
            password: Joi.string().required()
          }
        },
        handler: function (request, reply) {
          var username = request.payload.username;
          var password = request.payload.password;

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
