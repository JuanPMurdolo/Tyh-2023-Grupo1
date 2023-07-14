const Transaction = require("./Transaction");

class TransactionLeaf extends Transaction {
    constructor(inAddress, outAddress, encriptionForm, node) {
        super(inAddress, outAddress, encriptionForm, node);
    }
}

module.exports = TransactionLeaf;