const assert = require('assert');
const app = require('../../src/app');

describe('\'user-clicks\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-clicks');

    assert.ok(service, 'Registered the service');
  });
});
