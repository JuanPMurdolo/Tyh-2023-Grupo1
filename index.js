//main
const MD5Hash = require('./src/models/MD5Hash');
const SHA256Hash = require('./src/models/SHA256');
const TransactionNormal = require('./src/models/TransactionNormal');


// Ejemplo de uso
const md5Strategy = new MD5Hash();
const sha256Strategy = new SHA256Hash();
const transaction = new TransactionNormal('tx','inAddress', 'outAddress', md5Strategy, 'node');
console.log('Hash MD5:', transaction.calculateHash()); 

transaction.setHash(sha256Strategy);
console.log('Hash SHA256:', transaction.calculateHash());
