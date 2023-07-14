var Hashes = require('jshashes')
const Hash = require('./Hash');

class MD5Hash extends Hash {
  constructor() {
    this.name = 'MD5Hash';
    this.hashLength = 16;
  }

  hash(value) {
    var md5 = new Hashes.MD5;
    return md5.hex(value);
  }
}

module.exports = MD5Hash;