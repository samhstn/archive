var views = ['home', 'login', 'register'].map(function (route) {
  return {
    method: 'GET',
    path: route === 'home' ? '/' : '/' + route,
    handler: function (request, reply) {
      reply.view('layout', { component: route });
    }
  };
});

var riot = require('./riot.js');
var resources = require('./resources.js');

module.exports = views.concat([
  riot,
  resources
]);
