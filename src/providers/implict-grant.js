import Provider from './base';

function baseUrl() {
  let parts = [
    window.location.protocol, 
    '//',
    window.location.host
  ];
  let url = parts.join('');
  if (url.substr(-1) !== '/') {
    url += '/';
  }

  return url;
}


export default class ImplicitGrant extends Provider {
  constructor(options) {
    super(options);
    this.redirect_uri = options.redirect_uri || `${baseUrl()}oauth/callback`
    this.response_type = options.response_type || 'token'
    this.client_id = options.client_id;
    this.state = options.state;
  }

  open(options) {
    const random = this.state;
    const popup = this.popup;
    secrets[random] = this.popup;
    return popup.open().then((result) => {
      return result;
    })
  }
}
