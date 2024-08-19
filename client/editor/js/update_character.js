const url = window.location.href;
const param = url.slice(url.lastIndexOf('/') + 1);
console.log(param);