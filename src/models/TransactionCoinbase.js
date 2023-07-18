const Transaction = require("./Transaction");

class TransactionCoinbase extends Transaction {
    constructor(token, inAddress, outAddress, hashStrategy, node) {
        super(inAddress, outAddress, hashStrategy, node);
        this.token = this.generateTokenId(token);
        this.toString();
    }

    generateTokenId(token) {
        return token+'-'+this.uuid 
    }

    toString() {
        return JSON.stringify(this);
    }

}

module.exports = TransactionCoinbase;