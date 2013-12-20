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
			hackAddressData = {results: [], status: "NO" };
		}
	});
	return hackAddressData;
}

function getAddressLocation(hackAddressData) {
	if (hackAddressData.status == 'OK') {
		var location = hackAddressData.results[0].geometry.location;
		//alert(JSON.stringify(viewport));
		return location;
	}
	return null;
}