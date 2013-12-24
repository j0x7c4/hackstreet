 $(document).ready(function() {
        $("table").tablecloth({
          theme: "paper",
          striped: true,
          sortable: false,
          condensed: true
        });
        function addwz(shopId)
        {
          var url="http://www.dianping.com/shop/"+shopId;
          chrome.tabs.create({"url":url });
        }
        function remove(shopId)
        {
          $("#ctl"+shopId).remove();
          window.localStorage.removeItem("shop"+shopId);

        }

        for (var i in window.localStorage) {
          if (i.match("^shop[0-9]+$")) {
            var shop = JSON.parse(window.localStorage[i]);
            var liHTML = "<div class='row'>"+
                          "<p><strong>"+shop.shopName+"</strong><i id="+i+" class=\"icon-search\"></i><i id=del"+shop.shopId+" class=\"icon-trash\"></i></br>"+
                          "<small>"+shop.shopAddress+"</small></p>"+
                            "</div>";
            $("#settings").append(liHTML);//在table最后面添加一行
            $("#"+i).click(
              (function (shop) {
                return function() {
                  addwz(shop.shopId); 
                };
              })(shop)
            );
            $("#del"+shop.shopId).click(
              (function (shop) {
                return function() {
                  remove(shop.shopId); 
                };
              })(shop)
            );
          }
        }
      });


