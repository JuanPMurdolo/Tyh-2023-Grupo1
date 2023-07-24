const TransactionSimple = require('../../src/models/TransactionSimple');
const MD5Hash = require('../../src/models/MD5Hash');
const SHA256Hash = require('../../src/models/SHA256');

const Hash = require('../../src/models/Hash');

describe('Hash', () => {
  let hash;

  beforeEach(() => {
    hash = new Hash();
  });

  test('genera un error si se llama a generateHash directamente', () => {
    expect(() => {
      hash.generateHash('valor');
    }).toThrow('Se debe usar una clase que herede de Hash');
  });
});

test('debe establecer la estrategia hash', () => {
  const md5Strategy = new MD5Hash();
  const newHashStrategy = new SHA256Hash();
  const transactionSimple = new TransactionSimple('tx', 'inAddress', 'outAddress', md5Strategy, 'node');
  transactionSimple.setHash(newHashStrategy);
  expect(transactionSimple.hashStrategy).toBe(newHashStrategy);
});

test('debe dar error si no se establece una estrategia hash', () => {
  const md5Strategy = new MD5Hash();
  const transactionSimple = new TransactionSimple('tx', 'inAddress', 'outAddress', md5Strategy, 'node');

  transactionSimple.setHash(null);
  expect(() => transactionSimple.calculateHash()).toThrow('No se ha configurado una estrategia de hash');
});

describe('MD5Hash', () => {
  test('El método generateHash() debe devolver el hash MD5 correcto', () => {
    const md5Strategy = new MD5Hash();
    const hash = md5Strategy.generateHash('data');
    expect(hash).toBe('8d777f385d3dfec8815d20f7496026dc');
  });
});

describe('SHA256Hash', () => {
  test('El método generateHash() debe devolver el hash SHA256 correcto', () => {
    const sha256Strategy = new SHA256Hash();
    const hash = sha256Strategy.generateHash('data');
    expect(hash).toBe('3a6eb0790f39ac87c94f3856b2dd2c5d110e6811602261a9a923d3bb23adc8b7');
  });
});

describe('TransactionSimple', () => {
  test('El método calculateHash() debe devolver el hash correcto utilizando la estrategia especificada', () => {
    const md5Strategy = new MD5Hash();
    const transactionSimple = new TransactionSimple('tx', 'inAddress', 'outAddress', md5Strategy, 'node');

    const hash = transactionSimple.calculateHash();
    expect(hash).toEqual('a545200e658fda1cf78313b178ce59e9');
  });

  test('el metodo setHash() debe cambiar la estrategia hash', () => {
    const md5Strategy = new MD5Hash();
    const sha256Strategy = new SHA256Hash();
    const transactionSimple = new TransactionSimple('tx', 'inAddress', 'outAddress', md5Strategy, 'node');

    // Calcumamos hash con MD5
    let hash = transactionSimple.calculateHash();
    expect(hash).toEqual('a545200e658fda1cf78313b178ce59e9');

    // Cambiamos a SHA256
    transactionSimple.setHash(sha256Strategy);

    // Calcumamos hash con SHA256
    hash = transactionSimple.calculateHash();
    expect(hash).toEqual('c0144abe25b3b8d802c6ea3936f16120f5f508eced4ca1ff12b64a3e1f8b42ed');
  });
});
