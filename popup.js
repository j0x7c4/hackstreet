var init = function() {
    url = "http://map.qq.com/api/js?v=2.exp&key=d84d6d83e0e51e481e50454ccbe8986b";
    $.getScript(url, function(data, textStatus){
    //var url = "http://map.qq.com/api/js?v=2.exp&key=d84d6d83e0e51e481e50454ccbe8986b";x
        // 创建街景
        console.log(textStatus);
        var pano = new qq.maps.Panorama(document.getElementById('pano_holder'), {
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
        qq.maps.event.addListener(map, 'click', function (evt){
                var point = evt.latLng;
                var radius;
                pano_service.getPano(point, 1000, function (result){
                    pano.setPano(result.svid);
                });
            });

    });
    
    
};