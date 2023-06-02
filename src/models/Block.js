class Block {
    constructor(timestamp, transactions=[], hash) {
      this.timestamp = timestamp;
      this.transactions = transactions;
      this.hash = hash;
    }

    
  }
  
module.exports = Block;