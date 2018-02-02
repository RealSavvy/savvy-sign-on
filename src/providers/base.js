import { guid }  from '../utils/guid';
import { baseUrl } from '../utils/base-url';

class Popup {
  constructor(options) {
    this.state = options.state;
    this._data = null;
    this.source = null;
  }

  hasData() {
    return this._data != null;
  }

  getData() {
    return this._data;
  }

  setData(val) {
    this._data = val;
    return val;
  }

  open(options) {
    const url = options.url;

    this.source = window.open(url, this.state, 'height=600,width=600');

    const promiseWatchPopup = function(resolve, reject){
      let popup = this;
      if(popup.hasData()){
        resolve(popup.getData())
        if(this.source.close) {
          this.source.close();
        }
      }else if(popup.source.closed){
        reject(popup.source)
      }else{
        setTimeout(function(){
          promiseWatchPopup(resolve, reject)
        }, 100)
      }
    }.bind(this)
    return new Promise((resolve, reject) => {
      promiseWatchPopup(resolve, reject)
    });
  }
}


export default class Base {
  constructor(options) {
    var provider = this;

    this.domain = cleanDomain(options.domain);
    if(options.idxDomain){
      this.idxDomain = cleanDomain(options.idxDomain);
    }

    this.authorize_path = cleanPath(options.authorize_path || '/oauth/authorize');
    this.logout_path = cleanPath(options.logout_path || '/oauth_static/logout.html');

    this.allowedOrigins = options.allowedOrigins || [baseUrl().slice(0,-1)];
    this.secrets = {};
    this._state = options.state;

    if(window.addEventListener) {
      this.listener = window.addEventListener('message', handleMessages, false);
    } else {
      this.listener = window.attachEvent('onmessage', handleMessages);
    }

    function handleMessages(event) {
      let secrets = provider.secrets;
      const originMatches = provider.allowedOrigins === '*' || (event &&  provider.allowedOrigins.indexOf(event.origin) !== -1);
      let sourceMatches = true;
      if(event && event.source) {
        sourceMatches = secrets[event.data.state] && secrets[event.data.state].source == event.source;
      } else if (event && event.data.source) {
        sourceMatches = secrets[event.data.state] && secrets[event.data.state].source == event.data.source;
      } else {
        sourceMatches = false;
      }
      if(originMatches && sourceMatches){
        secrets[event.data.state].setData(event.data);
        secrets[event.data.state].hasData(event.data);
        secrets[event.data.state].source.close();
      }
    }

    function cleanPath(path) {
      if(path.substr(-1) === '/') {
        path = path.slice(0, -1);
      }
      return path;
    }

    function cleanDomain(domain){
      if(domain) {
        if(!domain.startsWith('http')) {
          let urlObject = new URL(`${window.location.protocol}//${domain}`);
          urlObject.pathname = '';
          domain = urlObject.toString();
        }
        domain = cleanPath(domain);

        return domain;
      } else {
        throw 'missing required option: domain';
      }
    }
  }

  get popup() {
    const secret = this.state;
    let popup = new Popup({
      state: secret,
    })
    this.secrets[secret] = popup;
    return popup;
  }

  get state() {
    return this._state || guid();
  }

  logout(options={}) {
    let popup = this.popup;
    let defaults = Object.assign({ state: popup.state }, this.defaults, options);

    let params = new URLSearchParams('');
    params.append('client_id', defaults.client_id);
    params.append('state', defaults.state);
    let url = `${this.domain}${this.logout_path}#${params.toString()}`

    if(this.idxDomain){
      let idxParams = new URLSearchParams('');
      idxParams.append('redirect_uri', url);
      url = `${this.idxDomain}${this.logout_path}?${idxParams.toString()}`
    }

    return popup.open(Object.assign({ url: url }, defaults)).then((result) => {
      return result;
    })
  }
}
