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
    this.client_id = options.client_id || '';
  }

  get defaults() {
    return {
      redirect_uri: this.redirect_uri,
      response_type: this.response_type,
      client_id: this.client_id,
      state: this.state
    }
  }

  open(options={}) {
    let defaults = Object.assign(this.defaults, options);
    const url = `${this.domain}?client_id=${defaults.client_id}&state=${defaults.state}&origin=${baseUrl()}&response_type=${defaults.response_type}&redirect_uri=${defaults.redirect_uri}`
    return this.popup.open(Object.assign({ url: url }, defaults)).then((result) => {
      return result;
    })
  }
}
