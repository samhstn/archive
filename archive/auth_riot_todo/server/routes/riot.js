module.exports = {
  method: 'GET',
  path: '/riot+compiler.min.js',
  handler: function (request, reply) {
    reply.file('node_modules/riot/riot+compiler.min.js');
  }
};
