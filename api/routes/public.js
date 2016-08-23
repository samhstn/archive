module.exports = {
  path: '/public/{filename}',
  method: 'get',
  handler: {
    directory: {
      path: './public'
    }
  }
};
