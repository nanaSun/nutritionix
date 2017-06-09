"use strict";
const http = require("http");
const querystring = require('querystring');
const apiID="3912a728";
const apiKey="93348161bf3709746463a237526d180f";
//https://api.nutritionix.com/v1_1/search
function onrequest(request, response){
    let r=null;
    let prettyJson ='';
    let s={};
    let opt = {  
        method: "POST", 
        path: "https://api.nutritionix.com/v1_1/search",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(s)
        }
    };  
    const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});
    request.addListener("end", function () {
        s.phrase="taco";
        s.apiID=apiID;
        s.apiKey=apiKey;
        
        response.writeHead(200,{"Content-Type":"application/json","Access-Control-Allow-Origin":"http://localhost"});
        r=
        if(typeof r.error!=="undefined"&&r.error===1){
            prettyJson=JSON.stringify(r, null, 4)
            response.write(prettyJson);
            response.end();
        }else{
            r.then(data => {
                prettyJson = JSON.stringify(data.jsonBody, null, 4);
                response.write(prettyJson);
                response.end();
            }).catch(e => {
                prettyJson = JSON.stringify({error:500}, null, 4);
                response.write(prettyJson);
                response.end();
            });
        }
    });
}
http.createServer(onrequest).listen(8888);