var crypto = require('crypto'),
    util = require('util'),
    EventEmitter = require('events').EventEmitter,
    Message = require('./Message');

function Server(options, storageService) {
    EventEmitter.call(this);

    options = options || {};

    this.type = options.type || Server.TYPE.TLS;

    this.storage = storageService || new require('./storage/MemoryStorage')();

    //if type is TLS and tls options aren't passed, error out
    if(this.type === Server.TYPE.TLS && !options.tls) {
        throw new Error('Server is of type TLS, but no tls options were passed.');
    }

    if(options.server) {
        var adr = options.server.address();
        this.port = adr.port;
        this.host = adr.host || adr.address;

        this.server = options.server;
    } else {
        this.port = options.port || (this.type === Server.TYPE.TLS ? Server.DEFAULT_TLS_PORT : Server.DEFAULT_PORT);
        this.host = options.host || '0.0.0.0';

        this.server = this._createServer(options.tls);
    }
}
module.exports = Server;

util.inherit(Server, EventEmitter);

Server.prototype.start = function(cb) {
    if(this.type === Server.TYPE.UDP) {
        this.server.bind(this.port, this.host, cb);
    } else {
        this.server.listen(this.port, this.host, cb);
    }
};

Server.prototype.close = function() {
    this.server.close();
};

Server.prototype._onMessage = function(buffer, rinfo) {
    var message;
    try {
        message = Message.fromBuffer(buffer);
    } catch(e) {
        return;
    }

    //for Response classes ensure there is an active transaction for this ID
    if(message.class === Message.CLASSES.SUCCESS_RESP || message.class === Message.CLASSES.ERROR_RESP) {
        if(!this.storage.isTransactionActive(message)) {
            return; //invalid message, silently discard
        }
    }

    /*If the FINGERPRINT extension
    is being used, the agent checks that the FINGERPRINT attribute is
    present and contains the correct value.  If any errors are detected,
    the message is silently discarded.*/

    //TODO: Authentication processing

    /*Once the authentication checks are done, the STUN agent checks for
    unknown attributes and known-but-unexpected attributes in the
    message.  Unknown comprehension-optional attributes MUST be ignored
    by the agent.  Known-but-unexpected attributes SHOULD be ignored by
    the agent.  Unknown comprehension-required attributes cause
    processing that depends on the message class and is described below.*/
};

Server.prototype._createServer = function(tlsOptions) {
    switch(this.type) {
        case Server.TYPE.UDP:
            this.net = require('dgram');
            this.server = this.net.createSocket('udp4');
            this.server.bind(this.port, this.host);
            this.server.on('message', this._onMessage.bind(this));
            break;

        case Server.TYPE.TCP:
            this.net = require('net');
            this.server = this.net.createServer();
            this.server.listen(this.port, this.host);
            this.server.on('connection', this._onTcpConnection.bind(this));
            break;

        case Server.TYPE.TLS:
            /* falls through */
        default:
            this.net = require('tls');
            this.server = this.net.createServer(tlsOptions);
            this.server.listen(this.port, this.host);
            this.server.on('secureConnection', this._onTcpConnection.bind(this));
    }
};

Server.prototype._onTcpConnection = function(stream) {
    stream.on('data', this._onMessage.bind(this));
};

Server.TYPE = {
    TLS: 0,
    TCP: 1,
    UDP: 2
};

Server.DEFAULT_PORT = 3478;
Server.DEFAULT_TLS_PORT = 5349;
