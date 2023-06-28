const {v4: uuidv4} = require('uuid');

class Transaction {
    constructor(id, inAddress, outAddress, hash) {
      this.id = id;
      this.inAddress = inAddress;
      this.outAddress = outAddress;
      this.hash = hash;
}

generateTransactionId() {
  return `Tx-${this.generateUUID()}`;
}

generateUUID() {
  return uuidv4();
} 

isCoinbase() {
  return this.lastTransactionId === null;
}

computeTransactionHash(data) {
  return this.hashFunction(`${data.id}${data.token}${data.sender}${data.recipient}${data.lastTransactionId}${data.timestamp}`);
}

    
}

module.exports = Transaction;