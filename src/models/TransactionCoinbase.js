const TransactionLeaf = require("./TransactionLeaf");

class TransactionCoinbase extends TransactionLeaf {
    constructor(token, uuid, inAddress, outAddress, encriptionForm, node) {
        super(uuid, inAddress, outAddress, encriptionForm, node);
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