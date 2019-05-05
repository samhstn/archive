module.exports = {
  method: 'GET',
  path: '/production/{filename}',
  handler: {
    directory: {
      path: './app/production'
    }
  }
};

