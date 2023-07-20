//main
const MD5Hash = require('./src/models/MD5Hash');
const SHA256Hash = require('./src/models/SHA256');
const transactionSimple = require('./src/models/TransactionSimple');
const Node = require('./src/models/Node');


// Ejemplo de uso
const md5Strategy = new MD5Hash();
const sha256Strategy = new SHA256Hash();
const transaction = new transactionSimple('tx', 'inAddress', 'outAddress', md5Strategy, 'node');
console.log('Hash MD5:', transaction.calculateHash());

transaction.setHash(sha256Strategy);
console.log('Hash SHA256:', transaction.calculateHash());


// creamod dos nodos
let node1 = new Node();
let node2 = new Node();

// conectamos los nodos
node1.addNode(node2);
node2.addNode(node1);

// agregamos las transacciones al node1
node1.addTransaction("Alice", "Bob", hashStrategy);
node1.addTransaction("Bob", "Charlie", hashStrategy);
node1.addTransaction("Charlie", "Dave", hashStrategy);


// chequeamos que ambos nodos tengan la misma blockchain
console.log(node1.blockchain.chain);
console.log(node2.blockchain.chain);