const TransactionNormal = require('../../src/models/TransactionNormal');
const MD5Hash = require('../../src/models/MD5Hash');
const SHA256Hash = require('../../src/models/SHA256');

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

describe('TransactionNormal', () => {
  test('El método calculateHash() debe devolver el hash correcto utilizando la estrategia especificada', () => {
    const md5Strategy = new MD5Hash();
    const transactionNormal = new TransactionNormal('tx','inAddress', 'outAddress', md5Strategy, 'node');

    const hash = transactionNormal.calculateHash();
    expect(hash).toEqual('fcb9b5a3c28ed0ecf440f8126a327639');
  });

  test('el metodo setHash() deberia cambiar la estrategia hash', () => {
    const md5Strategy = new MD5Hash();
    const sha256Strategy = new SHA256Hash();
    const transactionNormal = new TransactionNormal('tx','inAddress', 'outAddress', md5Strategy, 'node');

    // Calcumamos hash con MD5
    let hash = transactionNormal.calculateHash();
    expect(hash).toEqual('fcb9b5a3c28ed0ecf440f8126a327639');

    // Cambiamos a SHA256
    transactionNormal.setHash(sha256Strategy);

    // Calcumamos hash con SHA256
    hash = transactionNormal.calculateHash();
    expect(hash).toEqual('16363f57b784c2469bc817d69ec215c83f24c7ae10c2aa1d8e3ff8cf4e724fe7');
  });
});
