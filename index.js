//main
const MD5Hash = require('./src/models/MD5Hash');
const SHA256Hash = require('./src/models/SHA256');
const transactionSimple = require('./src/models/TransactionSimple');
const Node = require('./src/models/Node');
const Block = require('./src/models/Block');


// Ejemplo de uso
const md5Strategy = new MD5Hash();
const sha256Strategy = new SHA256Hash();
const transaction = new transactionSimple('tx', 'inAddress', 'outAddress', md5Strategy, 'node');
console.log('Hash MD5:', transaction.hash);
const block = new Block(Date.now(), []);
block.addTransaction(transaction);

console.log(transaction.toString());
console.log(transaction.isValid());
console.log(block.hasValidTransactions());

transaction.inAddress = 'hola';
//transaction.setHash(md5Strategy);

//transaction.hash = transaction.calculateHash();

//console.log('Hash SHA256:', transaction.hash);
console.log(transaction.toString());
console.log(transaction.isValid());
console.log(block.hasValidTransactions());



// creamod dos nodos
let node1 = new Node();
let node2 = new Node();

// conectamos los nodos
node1.addNode(node2);
node2.addNode(node1);

// agregamos las transacciones al node1
for (let i = 0; i < 25; i++) {
    var transaction1 = new transactionSimple('tx', 'inAddress', 'outAddress', new SHA256Hash(), 'node');
    node1.addTransaction(transaction1);
}
// chequeamos que ambos nodos tengan la misma blockchain
//console.log('blockchain node 1: ' + node1.blockchain.blocks);

/* for (let i = 0; i < node1.blockchain.blocks.length; i++) {
    console.log(node1.blockchain.blocks[i]);
}

//console.log('blockchain node 2: ' + node2.blockchain.blocks);

node2.blockchain.blocks.forEach(function (element) {
    console.log(element);
}); */

console.log(node1.blockchain.blocks[0].toString());
console.log(node1.blockchain.blocks[0].transactions[0].isValid());
console.log(node1.blockchain.blocks[0].hasValidTransactions());

console.log('Mi Blockchain es valida? ' + node1.isBlockchainValid());
console.log('modifico alguna transaccion: ' + node1.blockchain.blocks[0].transactions[0].inAddress);
console.log(node1.blockchain.blocks[0].transactions[0].inAddress = 'cambio en el historial clinico');
console.log(node1.blockchain.blocks[0].transactions[0].inAddress);
console.log(node1.blockchain.blocks[0].transactions[0]);
console.log('Transaccion invalida:' + node1.blockchain.blocks[0].transactions[0].isValid());
console.log('Bloque invalido:' + node1.blockchain.blocks[0].hasValidTransactions());

console.log('Mi Blockchain es valida? ' + node1.isBlockchainValid()); 