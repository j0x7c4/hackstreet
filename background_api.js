function buildGoogleUrl(address) {
    return "http://maps.googleapis.com/maps/api/geocode/json?address="+address+"&sensor=true";
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if ( request.method == "setlocation" ) {
              data = request.data;
              storage = window.localStorage;
              storage.setItem("currentShop",JSON.stringify(data));
              sendResponse({setLocation: "ok"});
        }
});