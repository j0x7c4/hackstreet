function tg(a) {
    a = Math.log(Math.tan(.008726646259971648 * (90 + a))) / .017453292519943295;
    return 111319.49077777778 * a;
}
function buildUrl(lat,lng) {
    x = 111319.49077777778 * lng;
    y = tg(lat);
    return "http://sv.map.qq.com/xf?x="+x+"&y="+y+"&r=100";
}
function buildGoogleUrl(address) {
    return "http://maps.googleapis.com/maps/api/geocode/json?address="+address+"&sensor=true";
}

var UNIQUE_MAP_VIEWER_ID = 'crx_myextension_iframe';
var latitude = -1;
var longitude = -1;

function onRenderMap() {
  var mapViewerDOM = document.getElementById(UNIQUE_MAP_VIEWER_ID);
  if (mapViewerDOM) {
     mapViewerDOM.parentNode.removeChild(mapViewerDOM);
  }

  mapViewerDOM = document.createElement('iframe');
  mapViewerDOM.setAttribute('id', UNIQUE_MAP_VIEWER_ID);
  mapViewerDOM.setAttribute('src', chrome.extension.getURL('wenbin.html'));
  mapViewerDOM.setAttribute('frameBorder', '0');
  mapViewerDOM.setAttribute('width', '99.90%');
  mapViewerDOM.setAttribute('height', '100%');
  document.getElementById("map-canvas").appendChild(mapViewerDOM);
}

$("body").append('<div id="modal-panel" class="modal hide" tabindex="-1" role="dialog" aria-labelledby="modal-label" aria-hidden="true"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><h3 id="modal-label">提示</h3></div><div id="map-canvas" style="width:862px;height:500px;"></div></div>');
$(".map").empty();
$(".map").append("<div id=pano style='height:236px;width:236px;'></div>");
$(".map-info").append("<a id=btn_map href=#>  Hack地图</a>");


//$("#pano").load("http://localhost/~jie/streetview/");
window.qq = window.qq || {};qq.maps = qq.maps || {};window.soso || (window.soso = qq);soso.maps || (soso.maps = qq.maps);
var loadScriptTime = (new Date).getTime();
qq.maps.__load = function (apiLoad) {
    delete qq.maps.__load;
    apiLoad(["http://open.map.qq.com/", "v2.0.10", "", 1387523864228, true, "d84d6d83e0e51e481e50454ccbe8986b", "20130701", "apifiles/v2/0/10/mods/", "apifiles/v2/0/10/theme/"],loadScriptTime);
};

address = $("span[itemprop='locality region']").text()+$("span[itemprop='street-address']").text()
console.log(address);
googleUrl = buildGoogleUrl(address);
$.getJSON( googleUrl , function (data) {
    lat = data.results[0].geometry.location.lat;
    lng = data.results[0].geometry.location.lng;

    $("#btn_map").click(
    (function(lat,lng){
        return function ( ) {
            chrome.extension.sendMessage(
                {
                    method:"setlocation",
                    data:{
                        lat:lat,
                        lng:lng
                    }
                },
                function(response) {
                    console.log(response.setLocation);
                }
            );
            onRenderMap();
            $('#modal-panel').modal({backdrop: 'static', keyboard: false});
          };
    })(lat,lng)
    );
    posUrl = buildUrl(lat,lng);
    $.get( posUrl, function( data ) {
        pid = data.match("\"svid\":\"([0-9]+)")[1];
        var pano = new window.qq.maps.Panorama(document.getElementById('pano'), {
            pano: pid,
            disableMove: false,
            pov:{
                heading:100,
                pitch:0
            },
            zoom:1
        });
    },"text");
});



