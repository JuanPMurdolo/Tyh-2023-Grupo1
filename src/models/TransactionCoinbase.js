const TransactionLeaf = require("./TransactionLeaf");

class TransactionCoinbase extends TransactionLeaf {
    constructor(token, uuid, inAddress, outAddress, encriptionForm, node) {
        super(uuid, inAddress, outAddress, encriptionForm, node);
        this.token = this.generateTokenId(token);
    }

    generateTokenId(token) {
        return token+'-'+this.uuid 
    }
}

module.exports = TransactionCoinbase;