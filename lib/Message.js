/**
 * Message header format:
 *
 * All STUN messages MUST start with a 20-byte header followed by zero
 * or more Attributes.  The STUN header contains a STUN message type,
 * magic cookie, transaction ID, and message length.
 *
 *      0                   1                   2                   3
 *     0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
 *    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *    |0 0|     STUN Message Type     |         Message Length        |
 *    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *    |                         Magic Cookie                          |
 *    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *    |                                                               |
 *    |                     Transaction ID (96 bits)                  |
 *    |                                                               |
 *    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 *
 * The most significant 2 bits of every STUN message MUST be zeroes.
 * The magic cookie field of every STUN message MUST be 0x2112A442.
 *
 * The message type field is decomposed further into the following
 * structure:
 *
 *                      0                 1
 *                      2  3  4 5 6 7 8 9 0 1 2 3 4 5
 *
 *                     +--+--+-+-+-+-+-+-+-+-+-+-+-+-+
 *                     |M |M |M|M|M|C|M|M|M|C|M|M|M|M|
 *                     |11|10|9|8|7|1|6|5|4|0|3|2|1|0|
 *                     +--+--+-+-+-+-+-+-+-+-+-+-+-+-+
 *
 */

function Message(type, tid, body) {
    this.type = type;
    this.body = body;
    this.tid = tid;

    // (type & 0b11111000000000) >> 2 | (type & 0b00000011100000) >> 1 | (type & 0b00000000001111)
    this.method = ((type & 0x3E00) >> 2) | ((type & 0xE0) >> 1) | (type & 0x0F);

    // (type & 0b00000100000000) >> 7 | (type & 0b00000000010000) >> 4
    this.class = ((type & 0x0100) >> 7) | ((type & 0x10) >> 4);
}
module.exports = Message;

///////////////////
// Instance Methods & Properties
///////////////////

/*Message.prototype.getMethodName = function() {
    return Message.METHODNAMES[this.method];
};

Message.prototype.getClassName = function() {
    return Message.CLASSNAMES[this.class];
};*/

Message.prototype.toBuffer = function() {
    var buff = new Buffer(8);

    buff.writeUInt16BE(this.type, 0);
    buff.writeUInt16BE(this.body.length, 2);
    buff.writeUInt32BE(Message.MAGIC_COOKIE, 4);

    return Buffer.concat([buff, this.tid.slice(0, 12)]);
};

///////////////////
// Static Methods & Properties
///////////////////

Message.fromBuffer = function(data, offset) {
    offset = offset || 0;

    //ANDs the first byte with 0b11000000 to ensure the first two bits are zero
    if((data[offset] & 192) !== 0) {
        Message.parseError('First two bits are not zero. First byte: 0x%02X', data[offset]);
    }

    //ensure the magic cookie value is set, which indicates this is an RFC5389 STUN Message
    if(data.readUInt32BE(offset + 4) !== Message.MAGIC_COOKIE) {
        Message.parseError('The magic cookie field is: 0x%08X', data.readUInt32BE(offset + 4));
    }

    //read data from message header
    var type = data.readUInt16BE(offset),
        length = data.readUInt16BE(offset + 2),
        tid = data.slice(offset + 8, offset + 20);

    //ensure length is proper
    if(length + Message.HEAD_SIZE > Message.MAX_SIZE) {
        Message.parseError(
            'The message length is too long. Passed length: %d bytes; maximum is: %d bytes',
            length,
            Message.MAX_SIZE - Message.HEAD_SIZE
        );
    }

    var message = new Message(type, tid, (new Array(length + 1)).join('A'));

    //check if method is supported
    if(!Message.METHOD_NAMES[message.method]) {
        Message.parseError('The message method is not supported. Passed value: 0x%03X', message.method);
    }

    //check is class is supported
    if(Message.METHOD_CLASSES[message.method].indexOf(message.class) === -1) {
        Message.parseError('The message class is not supported for this method. Method: 0x%03X, class: 0x%02X', message.method, message.class);
    }

    //pass validation, return message
    return message;
};

Message.CLASSES = {
    REQUEST:        0x00,
    INDICATION:     0x01,
    SUCCESS_RESP:   0x02,
    ERROR_RESP:     0x03
};

Message.CLASS_NAMES = {};
for(var c in Message.CLASSES) {
    Message.CLASS_NAMES[Message.CLASSES[c]] = c.replace(/_/g, '-');
}

Message.METHODS = {
    RESERVED:       0x000,
    BINDING:        0x001,
    SHARED_SECRET:  0x002,
};

Message.METHOD_NAMES = {};
for(var m in Message.METHODS) {
    Message.METHOD_NAMES[Message.METHODS[m]] = m.replace(/_/g, '-');
}

Message.METHOD_CLASSES = {};
Message.METHOD_CLASSES[Message.METHODS.RESERVED] = [];
Message.METHOD_CLASSES[Message.METHODS.BINDING] = [
    Message.CLASSES.REQUEST,
    Message.CLASSES.SUCCESS_RESP,
    Message.CLASSES.ERROR_RESP
];
Message.METHOD_CLASSES[Message.METHODS.SHARED_SECRET] = [
    Message.CLASSES.REQUEST,
    Message.CLASSES.SUCCESS_RESP,
    Message.CLASSES.ERROR_RESP
];

Message.ATTRIBUTES = {
    //Comprehension-required range (0x0000-0x7FFF):
    RESERVED:           0x0000, //0x0000: (Reserved)
    MAPPED_ADDRESS:     0x0001, //0x0001: MAPPED-ADDRESS
    RESPONSE_ADDRESS:   0x0002, //0x0002: (Reserved; was RESPONSE-ADDRESS)
    CHANGE_ADDRESS:     0x0003, //0x0003: (Reserved; was CHANGE-ADDRESS)
    SOURCE_ADDRESS:     0x0004, //0x0004: (Reserved; was SOURCE-ADDRESS)
    CHANGED_ADDRESS:    0x0005, //0x0005: (Reserved; was CHANGED-ADDRESS)
    USERNAME:           0x0006, //0x0006: USERNAME
    PASSWORD:           0x0007, //0x0007: (Reserved; was PASSWORD)
    MESSAGE_INTEGRITY:  0x0008, //0x0008: MESSAGE-INTEGRITY
    ERROR_CODE:         0x0009, //0x0009: ERROR-CODE
    UNKNOWN_ATTRIBUTES: 0x000A, //0x000A: UNKNOWN-ATTRIBUTES
    REFLECTED_FROM:     0x000B, //0x000B: (Reserved; was REFLECTED-FROM)
    REALM:              0x0014, //0x0014: REALM
    NONCE:              0x0015, //0x0015: NONCE
    XOR_MAPPED_ADDRESS: 0x0020, //0x0020: XOR-MAPPED-ADDRESS

    //Comprehension-optional range (0x8000-0xFFFF)
    SOFTWARE:           0x8022, //0x8022: SOFTWARE
    ALTERNATE_SERVER:   0x8023, //0x8023: ALTERNATE-SERVER
    FINGERPRINT:        0x8028  //0x8028: FINGERPRINT
};

Message.ATTRIBUTENAMES = {};
for(var a in Message.ATTRIBUTES) {
    Message.ATTRIBUTENAMES[Message.ATTRIBUTES[a]] = a.replace(/_/g, '-');
}

Message.MAGIC_COOKIE = 0x2112A442;
Message.HEAD_SIZE = 20;
Message.MAX_SIZE = 576;

var sprintf = require('sprintf').sprintf;

Message.parseError = function(msg) {
    msg = sprintf.apply(null, arguments);

    throw new Error('Invalid data/offset. ' + msg);
};
