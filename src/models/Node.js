const { SHA256 } = require('jshashes');
const Blockchain = require('./Blockchain');

class Node {
  constructor(openBlock = [], blocks = [], blockchain) {
    this.openBlock = openBlock;
    this.blocks = blocks;
    this.blockchain = blockchain;
  }

  addTransaction(transaction) {
        //to do
    }
      

  addCompositeTransaction(compositeTransaction) {
    //to do
    }

  hashCalculation(data) {
    
  }

  checkTransactionIntegrity(transaction) {
    return transaction.hash === this.computeTransactionHash(transaction);
  }

  verifyHashNode(){
    //to do
  }

  createNewBlock(){
    //to do
  }

  createTransaction(){
    //to do
  }

  broadcast(){
    //to do
  }
}

module.exports = Node;