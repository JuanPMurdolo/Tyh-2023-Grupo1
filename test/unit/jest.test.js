const TransactionCoinbase = require('../../src/models/TransactionCoinbase');
const Blockchain = require('../../src/models/Blockchain');
const Node = require('../../src/models/Node');
const TransactionNormal = require('../../src/models/TransactionNormal');

//Work In Progress



//Crear una transaccion coinbase
const coinbase = new TransactionCoinbase('token', 'inAddress', 'outAddress', 'hash', 'node');
const uid = coinbase.uuid;
test('token es NombreToken+UUID', () => {
expect (coinbase.uuid).toBe(uid);
});

//crear un blockchain
var blockchain = new Blockchain();
test('Blockchain se crea', () => {
expect (blockchain).toBeDefined();
});

//crear un node
const node = new Node([], [], blockchain);
test ('Node se crea', () => {
expect (node).toBeDefined();
});

//node.createNewBlock();
//test ('Se crea un nuevo bloque', () => {
//expect (node.blocks.length).toBe(2);
//});

node.addTransaction(coinbase);
test ('Se agrega la transaccion coinbase al node', () => {
expect (node.blocks[0].transactions[0]).toBe(coinbase);
});


//se crean 10 transacciones
//El bloque se cierra a las 10 transacciones
for (let i = 0; i < 10; i++) {
    const coinbase = new TransactionCoinbase('token', i, 'inAddress', 'outAddress', 'hash', node);
    node.addTransaction(coinbase);
    }
test ('Se agregan 10 transacciones al node', () => {
expect (node.blocks[0].transactions.length).toBe(10);
expect (node.blocks[node.blocks.length - 1].transactions.length).toBe(2);
});


//crear transaccion normal
// buscar la ultima transaccion que involucra a este token
const lastTrans = node.blocks[node.blocks.length - 1].transactions[node.blocks.length - 1]?.uuid;
const transaction = new TransactionNormal(lastTrans, 'inAddress', 'outAddress', 'hash', node);
test ('Se crea una transaccion normal', () => {
expect (transaction).toBeDefined();
});

//Se agrega la transaccion normal al nodo
node.addTransaction(transaction);
test ('Se agrega la transaccion normal al node', () => {
expect (node.blocks[node.blocks.length - 1].transactions.length).toBe(2);
});