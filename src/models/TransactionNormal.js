const TransactionLeaf = require("./TransactionLeaf");

class TransactionNormal extends TransactionLeaf {
    constructor(txIn, uuid, inAddress, outAddress, encriptionForm, node) {
        super(uuid, inAddress, outAddress, encriptionForm, node);
        this.transactionIn = txIn;
    }
}

module.exports = TransactionNormal;