const assert = require('assert');
const app = require('../../src/app');

describe('\'shorten-url\' service', () => {
  it('registered the service', () => {
    const service = app.service('shorten-url');

    assert.ok(service, 'Registered the service');
  });
});
