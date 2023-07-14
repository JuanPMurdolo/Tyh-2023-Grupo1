const TransactionCoinbase = require('../../src/models/TransactionCoinbase');
const Blockchain = require('../../src/models/Blockchain');
const Node = require('../../src/models/Node');

//Work In Progress



//Crear una transaccion coinbase
const coinbase = new TransactionCoinbase('token', 'inAddress', 'outAddress', 'hash', 'node');
const uid = coinbase.uuid;
test('token es NombreToken+UUID', () => {
expect (coinbase.uuid).toBe(uid);
});

var blockchain = new Blockchain();
test('Blockchain se crea', () => {
expect (blockchain).toBeDefined();
});


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
    const coinbase = new TransactionCoinbase('token', i, 'inAddress', 'outAddress', 'hash', 'node');
    node.addTransaction(coinbase);
    }
test ('Se agregan 10 transacciones al node', () => {
expect (node.blocks[0].transactions.length).toBe(10);
expect (node.blocks[node.blocks.length - 1].transactions.length).toBe(1);
});
