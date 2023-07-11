const {v4: uuidv4} = require('uuid');

class Transaction {
    constructor(uuid, inAddress, outAddress, hash, node) {
      this.node = node;
      this.uuid = uuid;
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

computeTransactionHash(data) {
  return this.hashFunction(`${data.id}${data.token}${data.sender}${data.recipient}${data.lastTransactionId}${data.timestamp}`);
}

    
}

module.exports = Transaction;