function tg(a) {
    a = Math.log(Math.tan(.008726646259971648 * (90 + a))) / .017453292519943295;
    return 111319.49077777778 * a;
}
function buildUrl(lat,lng) {
    x = 111319.49077777778 * lng;
    y = tg(lat);
    return "http://sv.map.qq.com/xf?x="+x+"&y="+y+"&r=100";
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
//$(".shop-location").find('li')
lat = 31.232685;
lng = 121.471046;
posUrl = buildUrl(lat,lng);
$.get( posUrl, function( data ) {
    var pano = new window.qq.maps.Panorama(document.getElementById('pano'), {
    pano: '10021010130505112127600',
    disableMove: false,
    pov:{
        heading:20,
        pitch:0
    },
    zoom:3
});
});


