const Transaction = require("./Transaction");

class TransactionNormal extends Transaction {
    constructor(txIn, inAddress, outAddress, hashStrategy, node) {
        super(inAddress, outAddress, hashStrategy, node);
        this.transactionIn = txIn;
    }
}

module.exports = TransactionNormal;