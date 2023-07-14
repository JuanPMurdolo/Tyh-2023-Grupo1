const Transaction = require("./Transaction");

class TransactionComposite extends Transaction {
  constructor(level,uuid, inAddress, outAddress, encriptionForm, node) {
      super(uuid, inAddress, outAddress, encriptionForm, node);
      this.level = level;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}
  
module.exports = TransactionComposite;