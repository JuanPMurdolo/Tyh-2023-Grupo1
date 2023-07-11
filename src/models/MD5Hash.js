const md5 = require('md5');

class MD5Hash extends Hash {
  constructor() {
    this.name = 'MD5Hash';
  }

  hash(value) {
    return md5(value);
  }
}

module.exports = MD5Hash;