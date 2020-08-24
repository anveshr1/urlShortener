// Initializes the `shorten-url` service on path `/shorten-url`
const { ShortenUrl } = require('./shorten-url.class');
const createModel = require('../../models/shorten-url.model');
const hooks = require('./shorten-url.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/shorten-url', new ShortenUrl(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('shorten-url');

  service.hooks(hooks);
};
