const TransactionCoinbase = require('../../src/models/TransactionCoinbase');
const Blockchain = require('../../src/models/Blockchain');
const Node = require('../../src/models/Node');

//Work In Progress

//El bloque se cierra a las 10 transacciones

//Crear una transaccion coinbase
const coinbase = new TransactionCoinbase('token', 'uuid', 'inAddress', 'outAddress', 'hash', 'node');
test('token es NombreToken+UUID', () => {
expect (coinbase.token).toBe('token-uuid');
});

var blockchain = new Blockchain();
test('Blockchain se crea', () => {
expect (blockchain).toBeDefined();
});


const node = new Node([], [], blockchain);
test ('Node se crea', () => {
expect (node).toBeDefined();
});

