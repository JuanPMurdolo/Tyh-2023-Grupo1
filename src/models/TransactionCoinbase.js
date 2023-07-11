const TransactionLeaf = require("./TransactionLeaf");

class TransactionCoinbase extends TransactionLeaf {
    constructor(token) {
        super();
        this.token = this.generateTokenId(token);
    }

    generateTokenId(token) {
        return token+'-'+this.uuid 
    }
}

module.exports = TransactionCoinbase;