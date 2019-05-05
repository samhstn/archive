module.exports = {
  method: 'get',
  path: '/resource/{param*}',
  handler: { directory: { path: 'public' } }
};
