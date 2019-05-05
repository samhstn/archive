module.exports = {
  path: '/{param*}',
  method: 'get',
  handler: (response, reply) => {
    reply.file('./app/production/index.html');
  }
};
