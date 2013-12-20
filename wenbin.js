			
      addStoreFromLocalStorage();
			$('#add').click(function(){
				var addressData = getAddress($('#address').val());
				var shopLocation = getAddressLocation(addressData);
        addStoreByLocation(storeSet.size(), 'wenbin store', $('#address').val(), shopLocation);
        $('#address').val('');
			});
      $('#show').click(function(){
        var shopList = storeSet.keys();
        showStoreByList(shopList);
      });
      $('#hide').click(function(){
        var shopList = storeSet.keys();
        hideStoreByList(shopList);
      });
      $('#clear').click(function(){
        $('#modal-panel').modal({backdrop: 'static', keyboard: false});
        initializeMap({lat: 31.2158, lng: 121.4205});
        var shopList = storeSet.keys();
        showStoreByList(shopList);
        //google.maps.event.addDomListener(window, 'load', initialize);
      });