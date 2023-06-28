class TransactionCoinbase extends Transaction {
    constructor(token) {
        super();
        this.token = token;
    }
}

module.exports = TransactionCoinbase;