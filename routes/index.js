var express = require('express');
var router = express.Router();
const https = require('https');

var checkpointController = require('../controllers/checkpoints');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'URL Reputation' });
});

router.post('/', checkpointController.getToken);

module.exports = router;
