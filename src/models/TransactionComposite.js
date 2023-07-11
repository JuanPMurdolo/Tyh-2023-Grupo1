const Transaction = require("./Transaction");

class TransactionComposite extends Transaction {
  constructor(level) {
      super(uuid, inAddress, outAddress, hash, node);
      this.level = level;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}
  
module.exports = TransactionComposite;