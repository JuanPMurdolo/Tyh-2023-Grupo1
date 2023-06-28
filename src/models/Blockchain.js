const { SHA256, MD5 } = require('jshashes');
const {v4: uuidv4} = require('uuid');
const Block = require('./Block');
const Transaction = require('./Transaction');
const CompositeTransaction = require('./TransactionComposite');

class Blockchain {
    constructor(blocks = []) {
      this.blocks = blocks;
      }







createCompositeTransaction(transactions) {
  const compositeTransaction = new CompositeTransaction(this.generateTransactionId(), transactions);
  compositeTransaction.timestamp = Date.now();
  compositeTransaction.hash = this.computeTransactionHash(compositeTransaction);
  return compositeTransaction;
}

computeTransactionHash(data) {
  return this.hashFunction(`${data.id}${data.token}${data.sender}${data.recipient}${data.lastTransactionId}${data.timestamp}`);
}

addTransaction(transaction) {
  if (transaction instanceof Transaction) {
    if (this.verifyTransactionIntegrity(transaction)) {
      this.pendingTransactions.push(transaction);
      this.currentBlockTransactions.push(transaction);
      if (this.currentBlockTransactions.length === 10) {
        this.closeBlock();
      }
    } else {
      console.log('Invalid transaction: integrity check failed');
    }
  } else {
    console.log('Invalid transaction');
  }
}

addCompositeTransaction(compositeTransaction) {
  if (compositeTransaction instanceof CompositeTransaction) {
    if (this.verifyCompositeTransactionIntegrity(compositeTransaction)) {
      this.pendingTransactions.push(compositeTransaction);
      this.currentBlockTransactions.push(compositeTransaction);
      if (this.currentBlockTransactions.length === 10) {
        this.closeBlock();
      }
    } else {
      console.log('Invalid composite transaction: integrity check failed');
    }
  } else {
    console.log('Invalid composite transaction');
  }
}

closeBlock() {
  const prevBlockHash = this.chain.length > 0 ? this.chain[this.chain.length - 1].hash : '';
  const timestamp = Date.now();
  const blockHash = this.computeBlockHash(this.currentBlockTransactions, prevBlockHash, timestamp);

  const block = new Block(timestamp, this.currentBlockTransactions, blockHash);
  this.chain.push(block);
  this.broadcastBlock(block);

  this.currentBlockTransactions = [];
}

addNode(node) {
  this.nodes.push(node);
}

getNodes() {
  return this.nodes;
}

computeTransactionHash(data) {
  return this.hashFunction(`${data.id}${data.token}${data.sender}${data.recipient}${data.lastTransactionId}${data.timestamp}`);
}

verifyTransactionIntegrity(transaction) {
  return transaction.hash === this.computeTransactionHash(transaction);
}

computeBlockHash(transactions, prevBlockHash, timestamp) {
  const transactionsHash = transactions.map(transaction => transaction.hash).join('');
  return this.hashFunction(`${transactionsHash}${prevBlockHash}${timestamp}`);
}

broadcastBlock(block) { 
  this.nodes.forEach(node => node.addBlock(block));
}

}

module.exports = Blockchain;