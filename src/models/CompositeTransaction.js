class CompositeTransaction {
    constructor(id, transactions) {
      this.id = id;
      this.transactions = transactions;
      this.timestamp = 0;
      this.hash = '';
    }
    
  
  }
  
  module.exports = CompositeTransaction;