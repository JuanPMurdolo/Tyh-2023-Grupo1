const { sha256 } = require('jhashes');

class SHA256Hash extends Hash{
  constructor() {
    this.name = 'SHA256';
    this.hashLength = 32;
  }

  hash(message) {
    return sha256(message);
  }
}

module.exports = SHA256Hash;