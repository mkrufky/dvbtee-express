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
  this.parser = parser
}

/* GET users listing. */
router.get('/file', function(req, res, next) {
  if (typeof req.query.url !== 'undefined') {
    var p = (new Parser(res)).parser
    fs.createReadStream(req.query.url).pipe(p)
  }
});

router.get('/url', function (req, res, next) {
  if (typeof req.query.url !== 'undefined') {
    var p = (new Parser(res)).parser
    request(req.query.url).pipe(p)
  }
});

module.exports = router;
