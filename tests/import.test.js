import assert from 'assert';

import { ImplictGrant } from '../dist/savvy-sign-on';

describe('dist-entry', function() {
  it('can be created', function() {
    var grant = new ImplictGrant({ domain: 'example.com'});
    assert(grant);
    assert.equal(grant.domain, 'http://example.com')
  })
});
