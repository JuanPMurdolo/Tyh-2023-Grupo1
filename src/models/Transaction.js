const {v4: uuidv4} = require('uuid');
const MD5Hash = require('./MD5Hash');
const SHA256 = require('./SHA256');


class Transaction {
    constructor(inAddress, outAddress, encriptionForm, node) {
      this.node = node;
      this.uuid = this.generateTransactionId();
      this.inAddress = inAddress;
      this.outAddress = outAddress;
      this.hash = this.computeTransactionHash(encriptionForm);
      this.status = 'pending';
}

generateTransactionId() {
  return `Tx-${this.generateUUID()}`;
}

generateUUID() {
  return uuidv4();
} 

computeTransactionHash(encriptionForm) {
  if (encriptionForm == 'MD5') {
    var encription = new MD5Hash();
  } else {
    //SHA256Hash es el default
    var encription = new SHA256();
  }
  console.log(encription)

  return this.hashFunction(`${this.uuid}${this.node}${this.outAddress}${this.inAddress}${this.status}`, encription);
}

hashFunction(data, encription) {
  return encription.hash(data);
}

closeTransaction() {
  this.status = 'closed';
}

}

module.exports = Transaction;