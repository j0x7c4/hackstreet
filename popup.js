 $(document).ready(function() {
        $("table").tablecloth({
          theme: "paper",
          striped: true,
          sortable: false,
          condensed: true
        });
        for (var i in window.localStorage) {
                var shop = JSON.parse(window.localStorage[i]);
            var trHTML = "<tr><td width='100px'>"+shop.shopName+"</td><td width='100px'>"+shop.shopAddress+"</td><td><div class='btn-group'><button type='button' class='btn btn-default'>街景</button><button type='button' class='btn btn-default'>删除</button><button type='button' class='btn btn-default'>Right</button></div></td></tr>";
            $("table").append(trHTML);//在table最后面添加一行

        };
      });


