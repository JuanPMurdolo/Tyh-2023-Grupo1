const { TransactionCoinbase } = require('../../src/transaction/transactionCoinbase');

//Work In Progress

//El bloque se cierra a las 10 transacciones

//Crear una transaccion coinbase
const coinbase = new TransactionCoinbase('token', 'uuid', 'inAddress', 'outAddress', 'hash', 'node');

