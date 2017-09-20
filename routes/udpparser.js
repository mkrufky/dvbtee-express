var express = require('express');
var router = express.Router();
var dvbtee = require('dvbtee');
var udp = require('datagram-stream');
var listener = require('./listener.js').Listener;

router.get('/start', function (req, res, next) {
    var ip = req.query.ip;
    var port = req.query.port;
    if (ip !== undefined && port !== undefined) {
        listener.Start(ip, port);
        res.status(200).json({'message': 'server started successfully'});
    } else {
        res.status(400).json({
            'error': 'USAGE: http://this.tv.ip.addr/udpparser/start?ip=224.0.1.2&port=5004'
        });
    }
});

router.get('/data', function (req, res, next) {
    var ip = req.query.ip;
    var port = req.query.port;
    if (ip !== undefined && port !== undefined) {
        res.status(200).json(listener.ReadTable(ip, port));
    } else {
        res.status(400).json({
            'error': 'USAGE: http://this.tv.ip.addr/udpparser/data?ip=224.0.1.2&port=5004'
        });
    }
});

module.exports = router;
