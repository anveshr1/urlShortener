// const path = require('path');
// const express = require('express');
// const router = express.Router();
// const app = require('./app');
// const shortid = require('shortid');
// const { addToHashMap } = require('./utilities/redis-utils');
// // const redisClient = app.get('redisClient');

// // router.get('/:shortURL', function(req, res, next) {
// //   //   res.send('healthy');
// //   const shortUrlCode = req.params.shortURL;
// // });

// module.exports = function(app) {
//   const redisClient = app.get('redisClient');

//   app.get('/:shortID', function(req, res) {
//     const shortUrlCode = req.params.shortID;
//   });

//   //   app.post('/shorten-url', async function(req, res) {
//   //     const { longURL, domain } = req.body;
//   //     const slashtag = shortid.generate();
//   //     const shortURL = `https://${domain ? domain : req.get('host')}/${slashtag}`;
//   //     const urlObject = {
//   //       shortURL,
//   //       longURL,
//   //       clicks: 0,
//   //       createdAt: Date.now()
//   //     };
//   //     const response = await addToHashMap(
//   //       redisClient,
//   //       slashtag,
//   //       null,
//   //       null,
//   //       urlObject
//   //     );
//   //     return response;
//   //   });

//   //other routes..
// };
