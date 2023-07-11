const { SHA256 } = require('jshashes');

class Node {
  constructor(OpenBlock, BlockChain) {
    this.OpenBlock = OpenBlock;
    this.BlockChain = BlockChain;
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

  hashCalculation(data) {
    return this.hashFunction(`${data.id}${data.token}${data.sender}${data.recipient}${data.lastTransactionId}${data.timestamp}`);
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