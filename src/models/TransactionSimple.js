const Transaction = require("./Transaction");

class TransactionSimple extends Transaction {
    constructor(txIn, inAddress, outAddress, hashStrategy, node) {
        super(inAddress, outAddress, hashStrategy, node);
        this.transactionIn = txIn;
    }

    isComposite() {
        return false;
    }
}

module.exports = TransactionSimple;