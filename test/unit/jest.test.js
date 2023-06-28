const { SHA256 } = require('jshashes');
const Blockchain = require('../../src/models/Blockchain.js');
const Transaction = require('../../src/models/Transaction.js');
const CompositeTransaction = require('../../src/models/TransactionComposite.js');

//Work In Progress

describe('Blockchain', () => {
  let blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
  });

  test('Deberia agregar las transacciones a la lista de espera', () => {
    const transaction = blockchain.createTransaction('TKN-6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b', 'A-123', 'B-456');
    blockchain.addTransaction(transaction);

    expect(blockchain.pendingTransactions).toContain(transaction);
    expect(blockchain.currentBlockTransactions).toContain(transaction);
  });

  test('Deberia cerrarse cuando llega a la onceava transaccion', () => {
    for (let i = 0; i < 11; i++) {
      const transaction = blockchain.createTransaction(`TKN-${i}`, `A-${i}`, `B-${i}`);
      blockchain.addTransaction(transaction);
    }

    const transaction11 = blockchain.createTransaction('TKN-11', 'A-10', 'B-10');
    blockchain.addTransaction(transaction11);

    expect(blockchain.chain.length).toBe(1);
    expect(blockchain.pendingTransactions).not.toContain(transaction11);
    expect(blockchain.currentBlockTransactions).not.toContain(transaction11);
  });

  test('Deberia computar el hash de manera correcta', () => {
    const transaction = blockchain.createTransaction('TKN-6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b', 'A-123', 'B-456');
    const expectedHash = SHA256(`${transaction.id}${transaction.token}${transaction.sender}${transaction.recipient}${transaction.lastTransactionId}${transaction.timestamp}`);

    const computedHash = blockchain.computeTransactionHash(transaction);

    expect(computedHash).toBe(expectedHash);
  });

  test('Deberia computar el hash del block de manera correcta', () => {
    const transactions = [
      blockchain.createTransaction('TKN-1', 'A-1', 'B-1'),
      blockchain.createTransaction('TKN-2', 'A-2', 'B-2'),
      blockchain.createTransaction('TKN-3', 'A-3', 'B-3')
    ];
    const prevBlockHash = 'prev-hash';
    const timestamp = Date.now();

    const expectedHash = SHA256(`${timestamp}${prevBlockHash}${transactions.map(tx => tx.hash).join('')}`);

    const computedHash = blockchain.computeBlockHash(transactions, prevBlockHash, timestamp);

    expect(computedHash).toBe(expectedHash);
  });


});