"use strict";
const http = require("http");
const querystring = require('querystring');
const url = require('url');

function onrequest(request, response){
  let params = url.parse(request.url, true).query,s="";
  response.writeHead(200,{"Access-Control-Allow-Methods":"POST,PUT,DELETE,GET","Content-Type":"application/json","Access-Control-Allow-Headers":"content-type","Access-Control-Request-Headers":"content-type","Access-Control-Allow-Origin":"*"}); 
  if(params.action==="create"||params.action==="update"){
    request.addListener("data", function (postDataChunk) {
          s += postDataChunk;
    });
    request.addListener("end", function () {
      response.write(s);
      response.end();
    });
  }else if(params.action==="read"){
    response.write(JSON.stringify({"date":"2017-07-12","food":{"brand_name":"AA","item_name":"Rice, Texas Long Grain Enriched","nutrient_name":"Calories","nutrient_uom":"kcal","nutrient_value":160,"ingredient_statement":"","nutrients":null,"resource_id":"1oJjS9aR","serving_qty":0.75,"serving_uom":"cup","thumbnail":"https://nixdotcom.s3.amazonaws.com/assets/nix-icon-small.png"},"dataType":"json","id":"0afe14ea-a7e0-6c9a-492f-f62ee262e8d2"}));
    response.end();
  }else{
    response.write(JSON.stringify({success:1}));
    response.end();
  }
  
}
http.createServer(onrequest).listen(3000);
