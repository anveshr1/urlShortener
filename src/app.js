const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');
const Redis = require('ioredis');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const authentication = require('./authentication');

const mongoose = require('./mongoose');

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

app.configure(mongoose);

let options = {};
const redisConfigs = app.get('redisConfig');
if (redisConfigs.sentinel) {
  options = {
    sentinels: [
      {
        port: redisConfigs.sentinelPort1,
        host: redisConfigs.sentinelHost1,
        password: redisConfigs.redisPassword
      },
      {
        port: redisConfigs.sentinelPort2,
        host: redisConfigs.sentinelHost2,
        password: redisConfigs.redisPassword
      },
      {
        port: redisConfigs.sentinelPort3,
        host: redisConfigs.sentinelHost3,
        password: redisConfigs.redisPassword
      }
    ],
    name: redisConfigs.name,
    password: redisConfigs.redisPassword
  };
} else {
  options = {
    port: redisConfigs.redisPort, // Redis port
    host: redisConfigs.redisHost, // Redis host
    family: 4, // 4 (IPv4) or 6 (IPv6)
    password: redisConfigs.redisPassword,
    db: 0
  };
}
const redisClient = new Redis(options);

redisClient.on('connect', function() {
  console.log('Connected to Redis');
});

redisClient.on('error', function(err) {
  console.log('Something went wrong ' + err);
});

app.set('redisClient', redisClient);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

// app.use('/', shortnerRoutes);

module.exports = app;
