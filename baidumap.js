var map = new BMap.Map('pano');
map.centerAndZoom(new BMap.Point(120.305456, 31.570037), 12);
map.enableScrollWheelZoom(true);
// 覆盖区域图层测试
map.addTileLayer(new BMap.PanoramaCoverageLayer());

var stCtrl = new BMap.PanoramaControl(); //构造全景控件
stCtrl.setOffset(new BMap.Size(20, 20));
map.addControl(stCtrl);//添加全景控件