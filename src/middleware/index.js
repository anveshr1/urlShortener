const shortid = require('shortid');
const { authenticate } = require('@feathersjs/authentication').hooks;
const { increment, setKey, getKey } = require('../utilities/redis-utils');
// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.
  const redisClient = app.get('redisClient');
  app.post('/shorten-url', async function(req, res) {
    try {
      const authResponse = await app.service('authentication').create({
        strategy: 'jwt',
        accessToken: req.headers.authorization
      });
    } catch (error) {
      return res.status(401).send(error);
    }

    const { longURL, domain } = req.body;
    const slashtag = shortid.generate();
    const shortURL = `https://${domain ? domain : req.get('host')}/${slashtag}`;
    const urlObject = {
      shortURL,
      longURL,
      slashtag,
      clicks: 0git
    };
    setKey(redisClient, slashtag, longURL);
    const response = await app.service('shorten-url').create(urlObject);
    return res.send(response);
  });

  app.get('/:shortid', async function(req, res) {
    const ipAddress =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection.socket ? req.connection.socket.remoteAddress : null);

    const shortUrlCode = req.params.shortid;
    const longURL = await getKey(redisClient, shortUrlCode);
    if (!longURL) {
      return res.status(404).send('Not Found');
    }
    increment(redisClient, `${shortUrlCode}-count`);
    app.service('user-clicks').create({
      slashtag: shortUrlCode,
      ipAddress
    });
    return res.redirect(307, longURL);
  });
};
