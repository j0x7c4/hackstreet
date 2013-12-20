// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
function buildDpSearhUrl ( text ) {
  return "http://www.dianping.com/search/keyword/1/0_"+text;
}
function buildDpShopUrl ( text ) {
  return "http://www.dianping.com/shop/"+text;
}
function buildGoogleUrl(address) {
    return "http://maps.googleapis.com/maps/api/geocode/json?address="+address+"&sensor=true";
}
function writeToStorage(id,name,address,lat,lng){
  var storage = window.localStorage;
  storage.setItem("shop"+id,JSON.stringify({"shopId":id,
    "shopName":name,
    "shopAddress":address,
    "location":{"lat":lat,"lng":lng}}));
}
// A generic onclick callback function.
function addToFav(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  text = info.selectionText;
  url = buildDpSearhUrl(text);
  $.get( url, function( data ) {
    if ( $(data).find(".detail .shopname").length===0 ) {
      alert("这个词在点评中找不到哦Q_Q");
      return ;
    }
    href = $(data).find(".detail .shopname a:eq(0)").attr('href');
    shopid = href.match("shop/([0-9]+)")[1];
    shopname = $(data).find(".detail .shopname a:eq(0)").text();
    t = $(data).find(".detail .address:eq(0)");
    shopaddr = t.text().trim().match(":(.*)")[1];

    googleUrl = buildGoogleUrl(shopaddr);
    $.getJSON( googleUrl , function (data) {
      lat = data.results[0].geometry.location.lat;
      lng = data.results[0].geometry.location.lng;
      writeToStorage(shopid,shopname,shopaddr,lat,lng);
      alert(buildDpShopUrl(shopid)+'\n'+shopname+'\n'+shopaddr+'\n'+lat+','+lng);
    });
  },"html");
  console.log("tab: " + JSON.stringify(tab));
}
function goToDp(info,tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  text = info.selectionText;
  url = buildDpSearhUrl(text);
  $.get( url, function( data ) {
    if ( $(data).find(".detail .shopname").length===0 ) {
      alert("这个词在点评中找不到哦Q_Q");
      return ;
    }
    href = $(data).find(".detail .shopname a:eq(0)").attr('href');
    shopid = href.match("shop/([0-9]+)")[1];
    shopurl = buildDpShopUrl(shopid);
    chrome.tabs.create({"url":shopurl});
  },"html");
  console.log("tab: " + JSON.stringify(tab));
}
// Create one test item for each context type.
var contexts = ["selection"];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  if ( context == "selection" ) {
    var title_1 = "加入我的最爱 :)";
    var id_1 = chrome.contextMenus.create({"title": title_1, "contexts":[context],
                                         "onclick": addToFav});
    console.log("'" + context + "' item:" + id_1);
    var title_2 = "在点评中找找看>_<";
    var id_2 = chrome.contextMenus.create({"title": title_2, "contexts":[context],
      "onclick":goToDp});
    console.log("'" + context + "' item:" + id_2);
  }
}

// Intentionally create an invalid item, to show off error checking in the
// create callback.
console.log("About to try creating an invalid item - an error about " +
            "item 999 should show up");
chrome.contextMenus.create({"title": "Oops", "parentId":999}, function() {
  if (chrome.extension.lastError) {
    console.log("Got expected error: " + chrome.extension.lastError.message);
  }
});
