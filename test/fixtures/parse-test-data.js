var Buffer = require('buffer').Buffer;

var data = {
    messages: [
        //valid messages
        {
            type:   fbin('00000100000001'),
            method: fbin('000000000001'), //binding request
            class:  fbin('10'), //success message

            cookie: 0x2112A442,
            length: fbin('0000000000000111'),
            tid: new Buffer([
                0x01, 0x1A, 0xFD, 0xDF,
                0x45, 0x2F, 0xFA, 0xDD,
                0x51, 0x9B, 0xCA, 0x56
            ])
        },
        {
            type:   fbin('00000100010010'),
            method: fbin('000000000010'),
            class:  fbin('11'),

            cookie: 0x2112A442,
            length: fbin('0000000000000111'),
            tid: new Buffer([
                0x01, 0x1A, 0xFD, 0xDF,
                0x45, 0x2F, 0xFA, 0xDD,
                0x51, 0x9B, 0xCA, 0x56
            ])
        },
        {
            type:   fbin('00000100000010'),
            method: fbin('000000000010'),
            class:  fbin('10'),

            cookie: 0x2112A442,
            length: fbin('0000000000000111'),
            tid: new Buffer([
                0x01, 0x1A, 0xFD, 0xDF,
                0x45, 0x2F, 0xFA, 0xDD,
                0x51, 0x9B, 0xCA, 0x56
            ])
        },
        {
            type:   fbin('00000000000001'),
            method: fbin('000000000001'),
            class:  fbin('00'),

            cookie: 0x2112A442,
            length: fbin('0000000000000111'),
            tid: new Buffer([
                0x01, 0x1A, 0xFD, 0xDF,
                0x45, 0x2F, 0xFA, 0xDD,
                0x51, 0x9B, 0xCA, 0x56
            ])
        }
    ],
    invalidMessages: [
        //invalid messages
        {
            type:   fbin('1100000100000001'), //invalid type header (first two bits are not 0)
            method: fbin('010010000001'),
            class:  fbin('10'),

            cookie: 0x2112A442,
            length: fbin('0000000000000111'),
            tid: new Buffer([
                0x01, 0x1A, 0xFD, 0xDF,
                0x45, 0x2F, 0xFA, 0xDD,
                0x51, 0x9B, 0xCA, 0x56
            ])
        },
        {
            type:   fbin('00000100000001'),
            method: fbin('100001001001'),
            class:  fbin('10'),

            cookie: 0x0102A242, //invalid magic cookie
            length: fbin('0000000000000111'),
            tid: new Buffer([
                0x01, 0x1A, 0xFD, 0xDF,
                0x45, 0x2F, 0xFA, 0xDD,
                0x51, 0x9B, 0xCA, 0x56
            ])
        },
        {
            type:   fbin('10100010110001'),
            method: fbin('101001010001'),
            class:  fbin('01'),

            cookie: 0x2112A442,
            length: fbin('0000000000000111'),
            tid: new Buffer([
                0x01, 0x1A, 0xFD, 0xDF,
                0x45, 0x2F, 0xFA, 0xDD,
                0x51, 0x9B, 0xCA, 0x56
            ])
        },
        {
            type:   fbin('00000000001011'),
            method: fbin('000000001011'),
            class:  fbin('00'),

            cookie: 0x2112A442,
            length: fbin('0000011111111111'),
            tid: new Buffer([
                0x01, 0x1A, 0xFD, 0xDF,
                0x45, 0x2F, 0xFA, 0xDD,
                0x51, 0x9B, 0xCA, 0x56
            ])
        },
        {
            type:   fbin('00000000010010'),
            method: fbin('000000000010'),
            class:  fbin('01'),

            cookie: 0x2112A442,
            length: fbin('0000000000000111'),
            tid: new Buffer([
                0x01, 0x1A, 0xFD, 0xDF,
                0x45, 0x2F, 0xFA, 0xDD,
                0x51, 0x9B, 0xCA, 0x56
            ])
        }
    ]
};

data.messages.concat(data.invalidMessages).forEach(function(msg) {
    msg.full = Buffer.concat([
        new Buffer([
            msg.type >> 8, msg.type, msg.length >> 8, msg.length,
            msg.cookie >> 24, msg.cookie >> 16, msg.cookie >> 8, msg.cookie
        ]),
        msg.tid
    ]);
});

function fbin(s) {
    return parseInt(s, 2);
}

module.exports = data;
