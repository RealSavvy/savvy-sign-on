import assert from 'assert';
import { ImplictGrant } from '../src/index';

describe('src-entry', function() {
  it('can be created', function() {
    var grant = new ImplictGrant({domain: 'example.com'});
    assert(grant);
  })

  it('can be opened and closed', function(done) {
    var grant = new ImplictGrant({domain: 'example.com'});
    let popupWindow = {};
    window.open = function() { return popupWindow }
    grant.open({}).then(function() {
      assert.ok(true)
      done();
    }, function(err) {
      assert.ok(true, err)
      done()
    })

    setTimeout(function() {
      popupWindow.closed = true;
    }, 10);
  });

  it('can be opened', function(done) {
    var grant = new ImplictGrant({domain: 'example.com', state: 'test', allowedOrigins: '*'});
    let popupWindow = { close: function() {}};
    window.open = function() { return popupWindow }
    grant.open({}).then(function(data) {
      assert.ok(true)
      assert(data.access_token == 'test')
      done();
    }, function(err) {
      assert.ok(false, err)
      done()
    })

    setTimeout(function() {
      window.postMessage({access_token: 'test', state: 'test', source: popupWindow }, '*')
    }, 10);
  });

  it('should send the right query string', function(done) {
    var grant = new ImplictGrant({
      domain: 'http://oauth.test',
      state: 'test-2',
      client_id: 'client_id',
      response_type: 'test',
      scopes: ['foo', 'bar']
    });
    let popupWindow = { close: function() {}};
    let openArgs = null;
    window.open = function(url, title, options) { 
      openArgs = {
        url, 
        title,
        options
      }
      return popupWindow 
    }

    grant.open().catch(() => {
      assert.equal(openArgs.url,'http://oauth.test?client_id=client_id&state=test-2&origin=http%3A%2F%2Fnode.test&response_type=test&redirect_uri=http%3A%2F%2Fnode.test%2Foauth%2Fcallback&scope=foo%20bar')
      done()
    });

    popupWindow.closed = true;
  });
});

