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
    return "http://maps.googleapis.com/maps/api/geocode/json?address="+address+"&sensor=true"
}

$(".map").empty();
$(".map").append("<div id=pano style='height:236px;width:236px;'></div>");
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
    posUrl = buildUrl(lat,lng);
    $.get( posUrl, function( data ) {
        pid = data.match("\"svid\":\"([0-9]+)")[1];
        var pano = new window.qq.maps.Panorama(document.getElementById('pano'), {
            pano: pid,
            disableMove: false,
            pov:{
                heading:20,
                pitch:0
            },
            zoom:3
        });
    },"text");
});



