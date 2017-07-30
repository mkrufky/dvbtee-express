# dvbtee-express
This is a basic example of how to use node-dvbtee with udp socket and how to use node-dvbtee, based on express-generator.
Thanks a lot to @mirmilad and @mkrufky

Extract EPG information and other metadata from mpegts udp stream.

<b>Usage for udp socket</b>

  Start Server:

    http://serveraddress/udpparser/start?ip=224.0.1.2&port=5004

  Get Information:

    http://serveraddress/udpparser/data?ip=224.0.1.2&port=5004
    
<b>Usage for express-generator</b>
    USAGE: http://this.tv.ip.addr/file?url=localfile.ts
    USAGE: http://this.tv.ip.addr/url?url=http://host.addr/path/to/segment.ts
