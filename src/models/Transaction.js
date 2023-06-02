class Transaction {
    constructor(id, sender, recipient, lastTransactionId) {
      this.id = id;
      this.sender = sender;
      this.recipient = recipient;
      this.lastTransactionId = lastTransactionId;
      this.timestamp = 0;
      this.hash = '';
}
    
}

module.exports = Transaction;