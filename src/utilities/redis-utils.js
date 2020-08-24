const Q = require('q');
const { isEmpty } = require('lodash');
/**
 * Fetches the value for the key passed
 * @param {redisCOnnector Obj} redisClient
 * @param {String} key
 */
async function getKey(redisClient, key) {
  const deferred = Q.defer();
  redisClient.get(key, function(err, value) {
    if (value) {
      deferred.resolve(value);
    }
    if (value === null) {
      deferred.resolve(null);
    }
    if (err) {
      deferred.reject({ error: err });
    }
  });
  return deferred.promise;
}

/**
 * Sets the key value pair in redis
 * @param {redisConnector Obj} redisClient
 * @param {String} key
 * @param {String} value
 */
async function setKey(redisClient, key, value) {
  const deferred = Q.defer();
  if (!value || !key) {
    deferred.reject({ error: 'Invalid parameters passed' });
  }
  redisClient.set(key, value, function(err, response) {
    if (response) {
      deferred.resolve(response);
    }
    if (err) {
      deferred.reject({ error: err });
    }
  });
  return deferred.promise;
}

async function addToHashMap(
  redisClient,
  hashMapName,
  key = null,
  value = null,
  mapObject = {}
) {
  if (isEmpty(mapObject)) {
    const object = {};
    object[key] = value;
    const response = await redisClient.hset(hashMapName, object);
    return response;
  }
  const response = await redisClient.hset(hashMapName, mapObject);
  return response;
}

async function getHashMap(redisClient, hashMapName) {
  const response = await redisClient.hgetall(hashMapName);
  return response;
}

async function increment(redisClient, key) {
  const resp = await redisClient.incr(key);
  return resp;
}

module.exports = {
  getKey: getKey,
  setKey: setKey,
  addToHashMap,
  getHashMap,
  increment
};
