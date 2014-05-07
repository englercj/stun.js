var util = require('util');

function MemoryStorage() {
    this.transactions = {};
}
module.exports = MemoryStorage;

MemoryStorage.prototype.pushMessage = function(message) {
    if(!this.transactions[message.tid]) {
        this.transactions[message.tid] = [message];
    } else {
        this.transactions[message.tid].push(message);
    }
};

MemoryStorage.prototype.isTransactionActive = function(message) {
    if(this.transactions[message.tid]) {
        return true;
    }
};
