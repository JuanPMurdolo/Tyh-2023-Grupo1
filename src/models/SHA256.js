var Hashes = require('jshashes')
const Hash = require('./Hash');

class SHA256Hash extends Hash{

  generateHash(value) {
    var SHA256 = new Hashes.SHA256;
    return SHA256.hex(value);
  }

}

module.exports = SHA256Hash;