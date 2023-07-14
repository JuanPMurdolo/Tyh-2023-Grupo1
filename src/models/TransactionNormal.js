const TransactionLeaf = require("./TransactionLeaf");

class TransactionNormal extends TransactionLeaf {
    constructor(txIn, inAddress, outAddress, encriptionForm, node) {
        super(inAddress, outAddress, encriptionForm, node);
        this.transactionIn = txIn;
    }
}

module.exports = TransactionNormal;