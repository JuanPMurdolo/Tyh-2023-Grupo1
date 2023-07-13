const { SHA256 } = require('jshashes');
const Blockchain = require('./Blockchain');
const Block = require('./Block');
const MD5Hash = require('./MD5Hash');

class Node {
  constructor(openBlock = [], blocks = [], blockchain) {
    this.openBlock = openBlock;
    this.blocks = blocks;
    this.blockchain = blockchain;
  }

  addTransaction(transaction) {
    if (this.blocks.length === 0) {
      //si no hay bloques
      //Crea el bloque de 0
      this.blocks.push(this.createNewBlock());
      //Despues pushea la transaction al bloque creado la transaction tiene que ser de tipo CoinBase

      //Se chequea si la transaccion es o no coinbase?
      if (transaction.isInstanceOf(CoinBase)) {
        this.blocks[0].transactions.push(transaction);
      };     
    } else {
      //si no agarra el ultimo bloque
      const lastBlock = this.blocks[this.blocks.length - 1];
      if (lastBlock.transactions.length < 10) {
        lastBlock.transactions.push(transaction);
      } else {
        //si ya tiene las 10 transactions se cierra
        this.lastBlock.status = 'closed';
        //se crea un nuevo bloque
        const newBlock = this.createNewBlock();
        //se pushea la transaction al nuevo bloque
        newBlock.transactions.push(transaction);
        //se pushea el nuevo bloque al array de bloques
        this.blocks.push(newBlock);
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
    
  }

  checkTransactionIntegrity(transaction) {
    return transaction.hash === this.computeTransactionHash(transaction);
  }

  verifyHashNode(){
    //to do
  }

  createNewBlock(){
    this.blocks.push(new Block(Date.now(), [], this.blocks[this.blocks.length - 1].hash));
  }

  createTransaction(){
    //to do
  }

  broadcast(){
    //to do
  }
}

module.exports = Node;