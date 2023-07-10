const Transaction = require("./Transaction");

class TransactionComposite extends Transaction {
  constructor(level) {
      super();
      this.level = level;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}
  
  module.exports = TransactionComposite;