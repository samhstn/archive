var Joi = require('joi');

var registerUser = require('../db/registerUser.js');

exports.register = function (server, options, next) {
  server.route([
    {
      method: 'POST',
      path: '/api/register',
      config: {
        description: 'post endpoint for registering',
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

          registerUser(server.app.pool, username, password, function (data) {
            reply(data);
          });
        }
      }
    }
  ]);

  return next();
};

exports.register.attributes = { name: 'Registration' };
