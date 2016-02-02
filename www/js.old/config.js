var deezer_api_key = "e578f30dfee96be239aa95680c2f1b08";
var url_http = "http://localhost:8100/";

//Add scrolling capabilities (scroll in browser) within dev enviroment
var css = 'html{overflow-y: auto !important;}',
head = document.head || document.getElementsByTagName('head')[0],
style = document.createElement('style');
style.appendChild(document.createTextNode(css));
head.appendChild(style);