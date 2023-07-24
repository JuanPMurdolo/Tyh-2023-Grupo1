const Transaction = require("./Transaction");

class TransactionCoinbase extends Transaction {
    constructor(inAddress, outAddress, hashStrategy, node) {
        super(inAddress, outAddress, hashStrategy, node);
        this.token = this.generateTokenId(this.getToken());
        //this.toString();
    }

    generateTokenId(token) {
        return token + '-' + this.generateUUID()
    }

    toString() {
        return JSON.stringify(this);
    }

    getToken() {
        return 'TKN';
    }

}

module.exports = TransactionCoinbase;