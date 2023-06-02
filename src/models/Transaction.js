class Transaction {
    constructor(id, token, sender, recipient, lastTransactionId) {
      this.id = id;
      this.token = token;
      this.sender = sender;
      this.recipient = recipient;
      this.lastTransactionId = lastTransactionId;
      this.timestamp = 0;
      this.hash = '';
    }
    
  
  }
  
  module.exports = Transaction;