var loc = location.href;
var n1 = loc.length;
var n2 = loc.indexOf('=');
var txt = decodeURI(loc.substr(n2 + 1, n1 - n2));
var box = document.getElementsByTagName('dt')[0];
box.innerHTML = txt;