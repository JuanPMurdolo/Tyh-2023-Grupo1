const TransactionLeaf = require("./TransactionLeaf");

class TransactionNormal extends TransactionLeaf {
    constructor(txIn) {
        super();
        this.transactionIn = txIn;
    }
}

module.exports = TransactionNormal;