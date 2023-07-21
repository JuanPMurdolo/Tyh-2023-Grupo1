const { SHA256 } = require('jshashes');
const Blockchain = require('./Blockchain');
const Block = require('./Block');
const MD5Hash = require('./MD5Hash');
const TransactionCoinbase = require('./TransactionCoinbase');
const config = require('./Config');

class Node {
  constructor(openBlock = [], blocks = [], blockchain) {
    this.openBlock = openBlock;
    this.blocks = blocks;
    this.blockchain = Blockchain.getInstance();
    this.connectedNodes = [];
  }

  addTransaction(transaction) {
    if (this.openBlock.length === 0) {
      //si no hay bloques
      //Crea el bloque de 0
      this.createNewBlock();
      //Despues pushea la transaction al bloque creado la transaction tiene que ser de tipo CoinBase

      //Se chequea si la transaccion es o no coinbase?

      if (transaction instanceof TransactionCoinbase) {
        this.openBlock[0].transactions.push(transaction);
      };
    } else {
      //si no agarra el ultimo bloque
      var lastBlock = this.openBlock[this.openBlock.length - 1];
      if (lastBlock.transactions.length < 10) {
        //validamos transaccion
        if (this.isValidTransaction(transaction)) {
          lastBlock.transactions.push(transaction);
          console.log('Transacción guardada en el bloque abierto.');

        } else {
          console.log('Transacción no válida. No se agregó al bloque abierto.');
        }
      } else {

        //si ya tiene las 10 transactions se cierra
        lastBlock.closeBlock();
        console.log('Bloque con 10 transacciones, se cierra');

        //se agrega el bloque a la blockchain
        this.broadcast(lastBlock);

        //se crea un nuevo bloque
        this.createNewBlock();

        var lastBlock = this.openBlock[this.openBlock.length - 1];
        lastBlock.addPreviousHash(this);

        //se pushea la transaction al nuevo bloque
        lastBlock.transactions.push(transaction);
      }
    }
  }

  addCompositeTransaction(compositeTransaction) {
    //to do
  }

  hashCalculation(value, hash) {
    if (hash.isInstanceOf(MD5Hash)) {
      return hash.hash(value);
    }
    else if (hash.isInstanceOf(SHA256Hash)) {
      return hash.hash(value);
    }
  }


  checkTransactionIntegrity(transaction) {
    return transaction.hash === this.computeTransactionHash(transaction);
  }

  verifyHashNode() {
    //to do

  }

  createNewBlock(previousHash = '') {
    this.openBlock.push(new Block(Date.now(), [], previousHash));
  }

  createTransaction(type, uuid, inAddress, outAddress, encriptionForm, token = '') {
    if (type === 'coinbase') {
      return new TransactionCoinbase(token, uuid, inAddress, outAddress, encriptionForm, this);
    }
    else if (type === 'composite') {
      return new TransactionComposite(level, uuid, inAddress, outAddress, encriptionForm, this);
    }
    else {
      return new TransactionNormal(txIn, uuid, inAddress, outAddress, encriptionForm, this);
    }
  }

  broadcast(block) {
    this.blockchain.addBlock(block);
  }

  addNode(node) {
    this.connectedNodes.push(node);
  }

  // Método para verificar la validez de una transacción
  isValidTransaction(transaction) {
    const hash = config.hashDefault.generateHash(transaction.getData());
    return hash === transaction.hash;
  }

}

module.exports = Node;