var dvbtee = require('dvbtee');
var udp = require('datagram-stream');
var tables = {};

var ReadTable = function (ip, port) {
    return tables[ip + ':' + port];
};

var Start = function (ip, port) {
    var key = ip + ':' + port;
    if (tables[key] !== undefined)
        return;
    tables[key] = {};

    var Parser = function (res) {
        parser = new dvbtee.Parser();
        parser.on('data', function (data) {
            if (!tables[key].hasOwnProperty(data.tableName)) {
                tables[key][data.tableName] = []
            }
            tables[key][data.tableName].push(data);
            tables[key]['versiondate'] = new Date();
        })
        this.parser = parser
    };


    console.log("i'm listening...");

    var p = (new Parser()).parser
    var stream = udp({
        address: '0.0.0.0' //address to bind tor
        ,
        multicast: ip //multicast ip address to send to and listen on
        ,
        port: undefined//udp port to send to
        ,
        bindingPort: port //udp port to listen on. Default: port
        ,
        reuseAddr: true //boolean: allow multiple processes to bind to the
        //         same address and port. Default: true
        ,
        loopback: false //boolean: whether or not to receive sent datagrams
        //         on the loopback device. Only applies to
        //         multicast. Default: false
    });

    //pipe whatever is received to stdout
    stream.pipe(p);
};

module.exports.Listener = {
    'Start': Start,
    'ReadTable': ReadTable
};
