//export some chai stuff
global.chai = require('chai');
global.expect = global.chai.expect;

//export some sinon
global.sinon = require('sinon');
global.chai.use(require('sinon-chai'));

var Buffer = require('buffer').Buffer;
global.assertBufferEqual = function(a, b) {
    expect(Buffer.isBuffer(a)).to.be.ok;
    expect(Buffer.isBuffer(b)).to.be.ok;
    expect(a.length).to.equal(b.length, 'Buffer lengths do not match.');

    for(var i = 0; i < a.length; ++i) {
        if(a[i] !== b[i]) {
            var sa = buff[i].toString(16).toUpperCase(),
                sb = msg.full[i].toString(16).toUpperCase();

            while(sa.length < 2) { sa = '0' + sa; }
            while(sb.length < 2) { sb = '0' + sb; }

            throw new Error('Expected 0x' + sa + ' to equal 0x' + sb + ' at buffer index ' + i);
        }
    }
};
