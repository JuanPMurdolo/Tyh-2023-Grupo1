var Hashes = require('jshashes')
const Hash = require('./Hash');

class MD5Hash extends Hash {

  generateHash(value) {
    var md5 = new Hashes.MD5;
    return md5.hex(value);
  }
}

module.exports = MD5Hash;