const Transaction = require("./Transaction");

class TransactionComposite extends Transaction {
    constructor(level, inAddress, outAddress, hashStrategy, node) {
        super(inAddress, outAddress, hashStrategy, node);
        this.transactions = [];
        this.altura = 0;

    }

    addTransaction(transaction) {
        if (this.transactions.length >= 3) {
            throw new Error("No se pueden agregar más de 3 transactions");
        }
        if (transaction.isComposite() && transaction.altura + 1 > 2) {
            throw new Error("La altura máxima de la jerarquía no puede superar 2");
        }
        this.transactions.push(transaction);
        if (transaction.isComposite()) {
            this.altura = Math.max(this.altura, transaction.altura + 1);
        }
    }

    isComposite() {
        return true;
    }
}

module.exports = TransactionComposite;