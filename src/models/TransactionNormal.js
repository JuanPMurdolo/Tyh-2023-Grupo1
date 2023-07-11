const TransactionLeaf = require("./TransactionLeaf");

class TransactionNormal extends TransactionLeaf {
    constructor(txIn) {
        super(uuid, inAddress, outAddress, hash, node);
        this.transactionIn = txIn;
    }
}

module.exports = TransactionNormal;