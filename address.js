function HashMap() {
	/** Map 大小 **/
	var size = 0;
	/** 对象 **/
	var entry = new Object();
	/** 存 **/
	this.put = function (key, value) {
		if(!this.containsKey(key)) {
			size ++ ;
		}
		entry[key] = value;
	}
	/** 取 **/
	this.get = function (key) {
		if (this.containsKey(key)) {
			return entry[key];
		} else {
			return null;
		}
	}
	/** 删除 **/
	this.remove = function (key) {
		if (delete entry[key]) {
			size --;
		}
	}
	/** 是否包含 Key **/
	this.containsKey = function (key) {
		return (key in entry);
	}
	/** 是否包含 Value **/
	this.containsValue = function (value) {
		for (var prop in entry) {
			if (entry[prop] == value) {
				return true;
			}
		}
		return false;
	}
	/** 所有 Value **/
	this.values = function () {
		var values = new Array();
		for(var prop in entry) {
			values.push(entry[prop]);
		}
		return values;
	}
	/** 所有 Key **/
	this.keys = function () {
		var keys = new Array();
		for(var prop in entry) {
			keys.push(prop);
		}
		return keys;
	}
	/** Map Size **/
	this.size = function () {
		return size;
	}
}

var map;
//var markers = [];
var storeSet;

function initializeMap() {
	var storage = window.localStorage;
	//var shopLocation;
	var currentShop;
	if (storage.getItem('currentShop')===null) {
		currentShop = {
			shopId: 0,
			shopName: '',
			shopAddress: '',
			shopLocation: {lat: 31,lng : 121}
		};
	} else {
		currentShop = JSON.parse(storage['currentShop']);
	}
	var mapOptions = {
		zoom: 9,
		center: currentShop.shopLocation
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	var image = 'markers.png';
	var marker = new google.maps.Marker({
		position: currentShop.shopLocation,
		map: map,
		icon:image
	});

	var shopList = storeSet.keys();
	for (var i = 0; i < shopList.length; i ++) {
		if (shopList[i] == currentShop.shopId) {
			shopList.splice(i, 1);
		}
	}
	showStoreByList(shopList);
}

function addStoreByLocation(shopId, shopName, shopAddress, shopLocation) {
	var ls = window.localStorage;
	ls['shop' + shopId] = JSON.stringify({
		shopId: shopId,
		shopName: shopName,
		shopAddress: shopAddress,
		shopLocation: shopLocation
	});
	var marker = new google.maps.Marker({
		position: shopLocation,
		map: null,
	});
	storeSet.put(
		'shop' + shopId, 
		new Store(shopId, shopName, shopAddress, marker)
	);
}

function addStoreByMarker(shopId, shopName, shopAddress, marker) {
	
}

function showStoreByList(storeList) {
	for (var i = 0; i < storeList.length; i ++) {
		if (storeSet.get(storeList[i]).marker.getMap() == null) {
			storeSet.get(storeList[i]).marker.setMap(map);
		}
	}
}

function hideStoreByList(storeList) {
	for (var i = 0; i < storeList.length; i ++) {
		if (storeSet.get(storeList[i]).marker.getMap() != null) {
			storeSet.get(storeList[i]).marker.setMap(null);
		}
	}
}

function addStoreFromLocalStorage() {
	storeSet = new HashMap();
	var ls = window.localStorage;
	for (var key in ls) {
		if ( key.match("^shop[0-9]+$") ) {
			var store = JSON.parse(ls[key]);
			var marker = new google.maps.Marker({
				position: store.shopLocation,
				map: null,
				title: store.shopName
			});
			storeSet.put(
				'shop' + store.shopId, 
				new Store(store.shopId, store.shopName, store.shopAddress, marker)
			);
		}
	}
}

function saveStoreToLocalStorage() {

}

function deleteStore() {

}

function deleteStoreByList(storeList) {
	for (var i = 0; i < storeList.length; i ++) {
		storeSet.remove(storeList[i]);
	}
}

function getAddress(hackAddress) {
	var googleMapUrl = 'http://maps.googleapis.com/maps/api/geocode/json';
	var hackAddressData;
	$.ajax({
		url: googleMapUrl,
		type: 'get',
		data:{
			address: hackAddress,
			sensor: true
		},
		async: false,
		dataType: 'json',
		success: function (data, textStatus, jqXHR) {
			hackAddressData = data;
		},
		error: function(jqXHR, textStatus, errorThrown){
			hackAddressData = {results: [], status: "ZERO_RESULTS" };
		}
	});
	return hackAddressData;
}

function getAddressLocation(hackAddressData) {
	if (hackAddressData.status == 'OK') {
		var location = hackAddressData.results[0].geometry.location;
		return location;
	}
	return null;
}

function Store(shopId, shopName, shopAddress, marker) {
	this.shopId = shopId;
	this.shopName = shopName;
	this.shopAddress = shopAddress;
	this.marker = marker;
}
