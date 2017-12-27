export function baseUrl() {
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

