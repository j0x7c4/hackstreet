$(".map").empty();
$(".map").append("<div id=pano></div>");
$("#pano").append("hackit");
//$("#pano").load("http://localhost/~jie/streetview/");
    
window.qq = window.qq || {};qq.maps = qq.maps || {};window.soso || (window.soso = qq);soso.maps || (soso.maps = qq.maps);
var loadScriptTime = (new Date).getTime();
qq.maps.__load = function (apiLoad) {
        delete qq.maps.__load;
        apiLoad(["http://open.map.qq.com/", "v2.0.10", "", 1387523864228, true, "d84d6d83e0e51e481e50454ccbe8986b", "20130701", "apifiles/v2/0/10/mods/", "apifiles/v2/0/10/theme/"],loadScriptTime);
    };
    
    var pano = new window.qq.maps.Panorama(document.getElementById('pano'), {
        pano: '10051001111220105028000',
        disableMove: false,
        pov:{
            heading:20,
            pitch:0
        },
        zoom:3
    });

    pano_service = new qq.maps.PanoramaService();
    pano_service.getPano(new qq.maps.LatLng(31.21533,121.42031), 100, function (result){
                pano.setPano(result.svid);
            });
