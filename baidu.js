function loadScript(url, callback) {
    var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement, 
    script, 
    options, 
    s;
    if (typeof url === "object") {
        options = url;
        url = undefined;
    }
    s = options || {};
    url = url || s.url;
    callback = callback || s.success;
    script = document.createElement("script");
    script.async = s.async || false;
    script.type = "text/javascript";
    if (s.charset) {
        script.charset = s.charset;
    }
    if (s.cache === false) {
        url = url + (/\?/.test(url) ? "&" : "?") + "_=" + (new Date()).getTime();
    }
    script.src = url;
    head.insertBefore(script, head.firstChild);
    if (callback) {
        document.addEventListener ? script.addEventListener("load", callback, false) : script.onreadystatechange = function() {
            if (/loaded|complete/.test(script.readyState)) {
                script.onreadystatechange = null
                callback()
            }
        }
    }
}
function loadScriptBody(url, callback) {
    var head = document.body || document.getElementsByTagName("body")[0] || document.documentElement, 
    script, 
    options, 
    s;
    if (typeof url === "object") {
        options = url;
        url = undefined;
    }
    s = options || {};
    url = url || s.url;
    callback = callback || s.success;
    script = document.createElement("script");
    script.async = s.async || false;
    script.type = "text/javascript";
    if (s.charset) {
        script.charset = s.charset;
    }
    if (s.cache === false) {
        url = url + (/\?/.test(url) ? "&" : "?") + "_=" + (new Date()).getTime();
    }
    script.src = url;
    head.insertBefore(script, head.firstChild);
    if (callback) {
        document.addEventListener ? script.addEventListener("load", callback, false) : script.onreadystatechange = function() {
            if (/loaded|complete/.test(script.readyState)) {
                script.onreadystatechange = null
                callback()
            }
        }
    }
}


$(".map").empty();
$(".map").append("<div id=pano style='height:236px;width:236px;'></div>");
loadScriptBody({"url":"http://localhost/baidumap.js","async":false,"charset":"utf-8","cache":false});

    
loadScriptBody({"url":"http://api.map.baidu.com/getscript?v=2.0&ak=zbRH6UeRzuIjYvYLivRNMC7K&services=&t=20131219100250","async":false,"charset":"utf-8","cache":false});
