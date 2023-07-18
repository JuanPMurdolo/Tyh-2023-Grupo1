const Transaction = require("./Transaction");

class TransactionComposite extends Transaction {
  constructor(level, inAddress, outAddress, hashStrategy, node) {
      super(inAddress, outAddress, hashStrategy, node);
      this.level = level;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}
  
module.exports = TransactionComposite;