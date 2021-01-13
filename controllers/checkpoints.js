var Checkpoint = require('../model/Checkpoint');

module.exports = {
  getToken: function(req, res){
    Checkpoint.getToken(req.body.api, function(err, token){
      if(err) res.render('error', { error: err });
      else {
        Checkpoint.getData(req.body.api, req.body.url, token, function(err, reputation){
          if(err) res.render('error', { error: err});
          res.render('result', { output: reputation.response[0] });
        });
      }
    });
  }
}
