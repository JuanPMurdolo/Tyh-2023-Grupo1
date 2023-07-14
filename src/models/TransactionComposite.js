const Transaction = require("./Transaction");

class TransactionComposite extends Transaction {
  constructor(level, inAddress, outAddress, encriptionForm, node) {
      super(inAddress, outAddress, encriptionForm, node);
      this.level = level;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}
  
module.exports = TransactionComposite;