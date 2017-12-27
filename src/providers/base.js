import { guid }  from '../utils/guid';

class Popup {
  constructor(options) {
    this.state = options.state;
    this._data = null;
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
    this.secrets = {};
    this._state = options.state;

    if(window.addEventListener) {
      this.listener = window.addEventListener('message', handleMessages, false);
    } else {
      this.listener = window.attachEvent('onmessage', handleMessages);
    }

    function handleMessages(event) {
      let secrets = provider.secrets;
      const originMatches = !provider.domain || (event &&  event.origin == provider.domain);
      let sourceMatches = true;
      if(event && event.source) {
        sourceMatches = secrets[event.data.state] && secrets[event.data.state].source == event.source;
      } else if (event && event.data.source) {
        sourceMatches = secrets[event.data.state] && secrets[event.data.state].source == event.data.source;
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
