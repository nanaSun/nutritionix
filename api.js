"use strict";
const http = require("http");
const querystring = require('querystring');
const url = require('url');
const NutritionixClient = require('nutritionix');

const apiID="3912a728";
const apiKey="93348161bf3709746463a237526d180f";
const nutritionix = new NutritionixClient({
    appId: apiID,
    appKey: apiKey
});
function errorHandler(response){
	response.write(JSON.stringify({"error":1}));
    response.end();
}
function onrequest(request, response){
    let r=null;
    let prettyJson ='';
  	let params = url.parse(request.url, true).query;
    response.writeHead(200,{"Content-Type":"application/json","Access-Control-Allow-Origin":"http://localhost"});	
    switch(params.action){
        case 'a': //autocomplete
           r=nutritionix.autocomplete({q:params.q});
           break;
        case 'n': //natural 
           r=nutritionix.natural(params.q.split(",").join('\n'));
           break;
        case 'i': //item
           r=nutritionix.item({ id: params.q });
           break;
        case 'b': //brand
           r=nutritionix.brand({ id: params.q });
           break;
        case 's': 
           r=nutritionix.search({
			  q:params.q,
			  limit: 10,
			  offset: 0
			});
           break;
        case 'bs': 
           r=nutritionix.brand_search({
			    q: params.q,
			    limit: 10,
			    offset: 0
			});
           break;
        default: 
           r={"error":1};
           break;
    };
    if(r.error===1){
		errorHandler(response);
    }else{
    	r.then(function(data){
    		if(params.action==='a'||params.action==='i'||params.action==='b'){
				response.write(JSON.stringify(data));
    		}else{
	    		response.write(JSON.stringify(data.results));
	    	}
	    	response.end();
	    },function(data){
	    	errorHandler(response);
	    }).catch(function(data){
	    	errorHandler(response);
	    });
    }
	
}
http.createServer(onrequest).listen(8888);
