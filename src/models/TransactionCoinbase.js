const TransactionLeaf = require("./TransactionLeaf");

class TransactionCoinbase extends TransactionLeaf {
    constructor(token, uuid, inAddress, outAddress, hash, node) {
        super(uuid, inAddress, outAddress, hash, node);
        this.token = this.generateTokenId(token);
    }

    generateTokenId(token) {
        return token+'-'+this.uuid 
    }
}

module.exports = TransactionCoinbase;