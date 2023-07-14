const {v4: uuidv4} = require('uuid');
const MD5Hash = require('../hash/MD5Hash');
const SHA256Hash = require('../hash/SHA256Hash');


class Transaction {
    constructor(uuid, inAddress, outAddress, encriptionForm, node) {
      this.node = node;
      this.uuid = uuid;
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
  if (encriptionForm == 'md5') {
    const encription = new MD5Hash();
  } else {
    const encription = new SHA256Hash();
  }
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