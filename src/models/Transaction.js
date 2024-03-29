const { v4: uuidv4 } = require('uuid');
const MD5Hash = require('./MD5Hash');
const SHA256 = require('./SHA256');
const config = require('./Config');


class Transaction {
  constructor(inAddress, outAddress, hashStrategy, node) {
    this.node = node;
    this.status = 'pending';
    this.uuid = this.generateTransactionId();
    this.inAddress = inAddress;
    this.outAddress = outAddress;
    this.hashStrategy = hashStrategy;
    this.hash = this.calculateHash();
  }

  generateTransactionId() {
    return `Tx-${this.generateUUID()}`;
  }

  generateUUID() {
    return uuidv4();
  }

  setHash(hashStrategy) {
    this.hashStrategy = hashStrategy;
  }

  calculateHash() {
    if (!this.hashStrategy) {
      throw new Error('No se ha configurado una estrategia de hash');
    }
    return this.hashStrategy.generateHash(this.getData());
  }

  isComposite() { }

  closeTransaction() {
    this.status = 'closed';
  }

  getData() {
    return `${this.node}${this.outAddress}${this.inAddress}`;
  }

  // Método para verificar la validez de una transacción
  isValid() {
    const hash = this.calculateHash(this.getData());
    return hash === this.hash;
  }

  toString() {
    return JSON.stringify(this);
  }

}

module.exports = Transaction;

/*Composite
Composite es un patrón de diseño estructural que te permite componer objetos 
en estructuras de árbol y trabajar con esas estructuras como si fueran objetos individuales.

Teniendo la interfaz común Transaction las transacciones se dividen en 3: Composite, Simple y Coinbase, 
las 3 tiene su conjunto propio de atributos y métodos que las hacen independientes pero todas pueden ser “contenidas” 
por su clase padre sirviendo como un punto común a la hora de testear, desarrollar y pensar la solución.
*/
