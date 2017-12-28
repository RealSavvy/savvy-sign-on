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
    this.domain = options.domain;
    if(this.domain) {
      if(!this.domain.startsWith('http')) {
        this.domain = new URL(`${window.location.protocol}//${this.domain}`).toString().slice(0, -1);
      }
    } else {
      throw 'missing required option: domain';
    }
    this.allowedOrigins = options.allowedOrigins || [baseUrl().slice(0,-1)]
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
        secrets[event.data.state].source.close()
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

}
