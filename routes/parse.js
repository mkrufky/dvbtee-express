var express = require('express');
var router = express.Router();
var fs = require('fs');
var dvbtee = require('dvbtee');
var request = require('request');

var Parser = function (res) {
  parser = new dvbtee.Parser;
  var tables = {}
  parser.on('data', function(data) {
    if (!tables.hasOwnProperty(data.tableName)) {
      tables[data.tableName] = []
    }
    tables[data.tableName].push(data)
  })
  parser.on('end', function() {
    res.send(tables);
  })
  this.s = parser
}

/* GET users listing. */
router.get('/file', function(req, res, next) {
  if (typeof req.query.url !== 'undefined') {
    fs.createReadStream(req.query.url).pipe((new Parser(res)).s)
  }
});

router.get('/url', function (req, res, next) {
  if (typeof req.query.url !== 'undefined') {
    request(req.query.url).pipe((new Parser(res)).s)
  }
});

module.exports = router;
