const { md5 } = require('jhashes');

class MD5Hash extends Hash {
  constructor() {
    this.name = 'MD5Hash';
  }

  hash(value) {
    return md5(value);
  }
}

module.exports = MD5Hash;