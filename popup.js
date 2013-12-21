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
            var trHTML = "<tr id=ctl"+shop.shopId+"><td width='100px'>"+shop.shopName+"</td><td width='100px'>"+shop.shopAddress+"</td><td><div class='btn-group'><a id="+i+" href=# class='btn btn-default' >去点评</a><button id=del"+shop.shopId+" type='button' class='btn btn-default'>删除</button><button type='button' class='btn btn-default'>Right</button></div></td></tr>";
            $("table").append(trHTML);//在table最后面添加一行
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


