const Transaction = require("./Transaction");

class TransactionLeaf extends Transaction {
    constructor(uuid, inAddress, outAddress, hash, node) {
        super(uuid, inAddress, outAddress, hash, node);
    }
}

module.exports = TransactionLeaf;