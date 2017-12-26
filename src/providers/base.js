import { guid }  from '../utils/guid';

class Popup {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.state = options.state;
    this.data = null;
  }

  open(options) {
    this.redirectUri = options.redirectUri;
    this.clientId = options.clientId;
    const fullUrl = options.fullUrl;
    this.source = window.open(fullUrl, this.state, 'height=600,width=600');
    const promiseWatchPopup = function(resolve, reject){
      if(this.data){
        resolve(this.data)
      }else if(this.source.closed){
        reject(this.source)
      }else{
        setTimeout(function(){
          promiseWatchPopup(resolve, reject)
        }, 100)
      }
    }
    return new Promise((resolve, reject) => {
      promiseWatchPopup(resolve, reject)
    });
  }
}


export default class Base {
  constructor(options) {
    this.provider = options.provider;
    this.clientUrl = options.clientUrl;
    this.secrets = {};
    if(window.addEventListener) {
      this.listener = window.addEventListener('message', this.handleMessages, false);
    } else {
      this.listener = window.attachEvent('onmessage', this.handleMessages);
    }
  }

  get popup() {
    const secret = this.state;
    let popup = new Popup({
      state: secret,
      baseUrl: this.clientUrl
    })
    this.secrets[secret] = popup;
    return popup;
  }

  get state() {
    return this.state || guid();
  }

  handleMessages(event){
    console.log("EVENT RECIEVED", event.data);
    let secrets = this.secrets;
    const originMatches = event && event.origin == domain
    const sourceMatches = event && event.data.state && secrets[event.data.state] && secrets[event.data.state].source == event.source
    if(originMatches && sourceMatches){
      secrets[event.data.state].data = event.data
      secrets[event.data.state].source.close()
    }
  }
}
