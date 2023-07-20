const Transaction = require('../../src/models/Transaction');
const TransactionComposite = require('../../src/models/TransactionComposite');
const TransactionSimple = require('../../src/models/TransactionSimple');
const MD5Hash = require('../../src/models/MD5Hash');
const SHA256Hash = require('../../src/models/SHA256');

describe('Transaction', () => {
  let transaction;
  let hashStrategy;
  let node;

  beforeEach(() => {
    hashStrategy = {
      generateHash: jest.fn()
    };
    node = 'node';
    transaction = new Transaction('inAddress', 'outAddress', hashStrategy, node);
  });

  test('debe generar un identificador de transacción', () => {
    expect(transaction.uuid).toMatch(/^Tx-/);
  });

  test('debe cerrar la transacción', () => {
    transaction.closeTransaction();
    expect(transaction.status).toBe('closed');
  });
});

describe('TransactionComposite', () => {
  let transactionComposite;
  let hashStrategy;
  let node;

  beforeEach(() => {
    hashStrategy = {};
    node = 'node';
    transactionComposite = new TransactionComposite(0, 'inAddress', 'outAddress', hashStrategy, node);
  });

  test('debe agregar una transacción', () => {
    const transaction = new TransactionSimple(null, 'inAddress', 'outAddress', hashStrategy, node);
    transactionComposite.addTransaction(transaction);
    expect(transactionComposite.transactions).toContain(transaction);
  });

  test('debe arrojar un error si se intentan añadir más de 3 transacciones', () => {
    for (let i = 0; i < 3; i++) {
      const transaction = new TransactionSimple(null, 'inAddress', 'outAddress', hashStrategy, node);
      transactionComposite.addTransaction(transaction);
    }
    const transaction = new TransactionSimple(null, 'inAddress', 'outAddress', hashStrategy, node);
    expect(() => transactionComposite.addTransaction(transaction)).toThrow('No se pueden agregar más de 3 transactions');
  });

  test('debe arrojar un error si se intenta añadir una transaccion compuesta con una altura superior a 2', () => {
    const compositeTransaction = new TransactionComposite(0, 'inAddress', 'outAddress', hashStrategy, node);
    compositeTransaction.altura = 2;
    expect(() => transactionComposite.addTransaction(compositeTransaction)).toThrow('La altura máxima de la jerarquía no puede superar 2');
  });

  test('debe actualizar la altura al añadir transacciones compuestas', () => {
    const compositeTransaction1 = new TransactionComposite(0, 'inAddress', 'outAddress', hashStrategy, node);
    compositeTransaction1.altura = 0;
    const compositeTransaction2 = new TransactionComposite(0, 'inAddress', 'outAddress', hashStrategy, node);
    compositeTransaction2.altura = 1;
    transactionComposite.addTransaction(compositeTransaction1);
    expect(transactionComposite.altura).toBe(1);
    transactionComposite.addTransaction(compositeTransaction2);
    expect(transactionComposite.altura).toBe(2);
  });

  test("debe devolver true para una transaccion compuesta", () => {
    const compositeTransaction = new TransactionComposite(0, 'inAddress', 'outAddress', hashStrategy, node);
    expect(compositeTransaction.isComposite()).toBe(true);
  });
});

describe('TransactionSimple', () => {
  let transactionSimple;
  let txIn;
  let hashStrategy;
  let node;

  beforeEach(() => {
    txIn = {};
    hashStrategy = {};
    node = 'node';
    transactionSimple = new TransactionSimple(txIn, 'inAddress', 'outAddress', hashStrategy, node);
  });

  test('debe establecer la propiedad txIn', () => {
    expect(transactionSimple.transactionIn).toBe(txIn);
  });
});