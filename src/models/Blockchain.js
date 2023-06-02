const { SHA256, MD5 } = require('jshashes');
const {v4: uuidv4} = require('uuid');

class Blockchain {
    constructor() {
      if (Blockchain.instance) {
          return Blockchain.instance;
        }
        this.chain = [];
        this.pendingTransactions = [];
        this.currentBlockTransactions = [];
        this.nodes = [];
        this.hashFunction = SHA256;
        Blockchain.instance = this;
      }

generateTransactionId() {
  return `Tx-${this.generateUUID()}`;
}

generateUUID() {
  return uuidv4();
} 

createTransaction(token, sender, recipient, lastTransactionId = null) {
  const transaction = new Transaction(this.generateTransactionId(), token, sender, recipient, lastTransactionId);
  transaction.timestamp = Date.now();
  transaction.hash = this.computeTransactionHash(transaction);
  return transaction;
}

createCompositeTransaction(transactions) {
  const compositeTransaction = new CompositeTransaction(this.generateTransactionId(), transactions);
  compositeTransaction.timestamp = Date.now();
  compositeTransaction.hash = this.computeTransactionHash(compositeTransaction);
  return compositeTransaction;
}

computeTransactionHash(data) {
  return this.hashFunction(`${data.id}${data.token}${data.sender}${data.recipient}${data.lastTransactionId}${data.timestamp}`);
}

}

module.exports = Blockchain;