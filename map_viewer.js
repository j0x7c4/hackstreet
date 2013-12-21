chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.method == 'RenderMap') {
    renderMap(request.data.latitude, request.data.longitude);
  }
});

function renderMap(latitude, latitude) {
  var map = new GMap2(document.getElementById('map_canvas'));
  map.setCenter(new GLatLng(latitude, latitude), 13);
  var marker = new GMarker(new GPoint(lng, lat));
  map.addOverlay(marker);
}