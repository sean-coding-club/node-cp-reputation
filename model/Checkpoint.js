const https = require('https');

var Checkpoint = function(data){
  this.api = data.api;
  this.check = data.check;
};

Checkpoint.getToken = function(api, callback){
  // var token;
  var options = {
    method: 'GET',
    headers: { 'Client-Key': api},
    host:"rep.checkpoint.com",
    path:"/rep-auth/service/v1.0/request"
  };

  const req = https.request(options, (res) => {
    res.on('data', (d) => {
      callback(null, d);
    });
  });

  req.on('error', (e) => {
    callback(e);
  });

  req.end();
}

Checkpoint.getData = function(api, url, token, callback){

  const data = JSON.stringify({
    request: [{ 'resource': url }]
  });

  var options = {
    method: 'POST',
    headers: { 'Client-Key': api, 'token': token, 'content-type':'application/json' },
    host: 'rep.checkpoint.com',
    body: { 'request': [{ 'resource': url }] },
    path: '/url-rep/service/v2.0/query?resource=' + url
  };

  const req = https.request(options, (res) => {
    let info = '';

    console.log('Status Code:', res.statusCode);

    res.on('data', (chunk) => {
      info += chunk;
    });

    res.on('end', () => {
      callback(null, JSON.parse(info));
    });

  }).on("error", (err) => {
    callback(err);
  });

  req.write(data);
  req.end();

}

module.exports = Checkpoint;
