import assert from 'assert';

import { ImplictGrant } from '../dist/savvy-sign-on';

describe('dist-entry', function() {
  it('can be created', function() {
    var grant = new ImplictGrant({});
    assert(grant);
  })
});
