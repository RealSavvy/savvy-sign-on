import Provider from './base';
import { baseUrl } from '../utils/base-url';

export default class ImplicitGrant extends Provider {
  constructor(options) {
    super(options);
    this.redirect_uri = options.redirect_uri || `${baseUrl()}oauth/callback`;
    this.response_type = options.response_type || 'token';
    this.client_id = options.client_id || '';
    this.scopes = options.scopes || options.default_scopes || [];
  }

  get defaults() {
    return {
      redirect_uri: this.redirect_uri,
      response_type: this.response_type,
      client_id: this.client_id,
      scopes: this.scopes
    }
  }

  open(options={}) {
    let popup = this.popup;
    let defaults = Object.assign({ state: popup.state }, this.defaults, options);
    let url = `${this.domain}?client_id=${defaults.client_id}&state=${defaults.state}&origin=${baseUrl()}&response_type=${defaults.response_type}&redirect_uri=${defaults.redirect_uri}`
    if(defaults.scopes.length) {
      url += `&scopes=${defaults.scopes.join(' ')}`
    }
    return popup.open(Object.assign({ url: url }, defaults)).then((result) => {
      return result;
    })
  }
}
