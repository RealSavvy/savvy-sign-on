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
      scopes: this.scopes,
    }
  }

  open(options={}) {
    let popup = this.popup;
    let defaults = Object.assign({ state: popup.state }, this.defaults, options);
    let params = new URLSearchParams('');
    params.append('client_id', defaults.client_id);
    params.append('state', defaults.state);
    params.append('origin', baseUrl().slice(0, -1));
    params.append('response_type', defaults.response_type);
    params.append('redirect_uri', defaults.redirect_uri);
    if(defaults.scopes.length) {
      params.append('scope', defaults.scopes.join(' '));
    }
    let url = `${this.domain}${this.authorize_path}?${params.toString()}`

    if(this.idxDomain){
      let idxParams = new URLSearchParams('');
      idxParams.append('redirect_uri', url);
      url = `${this.idxDomain}${this.authorize_path}?${idxParams.toString()}`
    }

    return popup.open(Object.assign({ url: url }, defaults)).then((result) => {
      return result;
    })
  }
}
