const TransactionLeaf = require("./TransactionLeaf");

class TransactionCoinbase extends TransactionLeaf {
    constructor(token) {
        super();
        this.token = token;
    }
}

module.exports = TransactionCoinbase;