var Message = require('../../lib/Message'),
    buffer = require('buffer').Buffer,
    testData = require('../fixtures/parse-test-data');

describe('stun/Message', function() {
    it('should have the proper exports', function() {
        expect(Message).to.be.a('function');

        expect(Message.fromBuffer).to.be.a('function');
    });

    describe('.fromBuffer', function() {
        it('should properly create a message', function() {
            testData.messages.forEach(function(msg) {
                var obj = Message.fromBuffer(msg.full);

                expect(obj.type).to.equal(msg.type);
                expect(obj.body.length).to.equal(msg.length);

                assertBufferEqual(obj.tid, msg.tid);

                expect(obj.method).to.equal(msg.method);
                expect(obj.class).to.equal(msg.class);
            });
        });

        it('should throw an error when the message is invalid', function() {
            testData.invalidMessages.forEach(function(msg) {
                expect(Message.fromBuffer.bind(null, msg.full)).to.throw(Error);
            });
        });
    });

    describe('#toBuffer', function() {
        it('should properly serialize a message', function() {
            testData.messages.forEach(function(msg) {
                var obj = Message.fromBuffer(msg.full);

                assertBufferEqual(obj.toBuffer(), msg.full);
            });
        });
    });
});
