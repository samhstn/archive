var env = process.env

module.exports = {
  user: env.DATABASE_USER,
  database: env.NODE_ENV === 'test' ? env.TEST_DATABASE_NAME : env.DATABASE_NAME,
  password: ' ',
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  max: '10',
  idleTimeoutMillis: 10000
};

