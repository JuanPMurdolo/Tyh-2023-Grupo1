const { SHA256 } = require('jshashes');
const Blockchain = require('./Blockchain');
const Block = require('./Block');
const MD5Hash = require('./MD5Hash');
const TransactionCoinbase = require('./TransactionCoinbase');

class Node {
  constructor(openBlock = [], blocks = [], blockchain) {
    this.openBlock = openBlock;
    this.blocks = blocks;
    this.blockchain = new Blockchain();
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
        lastBlock.transactions.push(transaction);
      } else {
        
        //si ya tiene las 10 transactions se cierra
        lastBlock.closeBlock();

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
    if (hash.isInstanceOf(MD5Hash)){
      return hash.hash(value);
    }
    else if (hash.isInstanceOf(SHA256Hash)){
      return hash.hash(value);
    }
  }
    

  checkTransactionIntegrity(transaction) {
    return transaction.hash === this.computeTransactionHash(transaction);
  }

  verifyHashNode(){
    //to do

  }

  createNewBlock(previousHash = ''){
    this.openBlock.push(new Block(Date.now(), [], previousHash));
  }

  createTransaction(type, uuid, inAddress, outAddress, encriptionForm, token = ''){
    if (type === 'coinbase') {
      return new TransactionCoinbase(token, uuid, inAddress, outAddress, encriptionForm, this);
    }
    else if (type === 'composite') {
      return new TransactionComposite(level,uuid, inAddress, outAddress, encriptionForm, this);
    }
    else {
      return new TransactionNormal(txIn, uuid, inAddress, outAddress, encriptionForm, this);
    }
  }

  broadcast(block){
    this.blockchain.addBlock(block);
  }
}

module.exports = Node;