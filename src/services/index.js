const users = require('./users/users.service.js');
const shortenUrl = require('./shorten-url/shorten-url.service.js');
const userClicks = require('./user-clicks/user-clicks.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(shortenUrl);
  app.configure(userClicks);
};
