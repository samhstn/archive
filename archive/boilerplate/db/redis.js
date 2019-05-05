const redis = require('redis');
const bluebird = require('bluebird');

const port = process.env.PORT || 6379;
const host = process.env.HOST || 'localhost';
const db = process.env.NODE_ENV === 'test' ? 5 : 0;

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient({
  host,
  port,
  db
});

module.exports = client;
