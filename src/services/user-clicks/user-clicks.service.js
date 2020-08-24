// Initializes the `user-clicks` service on path `/user-clicks`
const { UserClicks } = require('./user-clicks.class');
const createModel = require('../../models/user-clicks.model');
const hooks = require('./user-clicks.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/user-clicks', new UserClicks(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('user-clicks');

  service.hooks(hooks);
};
