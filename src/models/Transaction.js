const {v4: uuidv4} = require('uuid');
const MD5Hash = require('./MD5Hash');
const SHA256 = require('./SHA256');


class Transaction {
    constructor(inAddress, outAddress, hashStrategy, node) {
      this.node = node;
      this.uuid = this.generateTransactionId();
      this.inAddress = inAddress;
      this.outAddress = outAddress;
      this.hash = hashStrategy;
      this.status = 'pending';
}

generateTransactionId() {
  return `Tx-${this.generateUUID()}`;
}

generateUUID() {
  return uuidv4();
} 

setHash(hashStrategy) {
  this.hash = hashStrategy;
}

calculateHash() {
  if (!this.hash) {
    throw new Error('No se ha configurado una estrategia de hash');
  }
  return this.hash.generateHash(`${this.node}${this.outAddress}${this.inAddress}${this.status}`);
}

closeTransaction() {
  this.status = 'closed';
}

}

module.exports = Transaction;