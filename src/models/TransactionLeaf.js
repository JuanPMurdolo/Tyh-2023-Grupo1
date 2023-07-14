const Transaction = require("./Transaction");

class TransactionLeaf extends Transaction {
    constructor(uuid, inAddress, outAddress, encriptionForm, node) {
        super(uuid, inAddress, outAddress, encriptionForm, node);
    }
}

module.exports = TransactionLeaf;