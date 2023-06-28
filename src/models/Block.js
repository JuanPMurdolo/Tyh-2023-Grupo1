class Block {
    constructor(timestamp, transactions=[], hash, previousHash) {
      this.timestamp = timestamp;
      this.transactions = transactions;
      this.hash = hash;
      this.previousHash = previousHash;
    }

    fullfillHash(){
        //to do
    }

    addPreviousHash(){
        //to do
    }

    blockClosure(){
        const prevBlockHash = this.chain.length > 0 ? this.chain[this.chain.length - 1].hash : '';
        const timestamp = Date.now();
        const hash = this.computeBlockHash(this.currentBlockTransactions, prevBlockHash, timestamp);
        this.currentBlockTransactions = [];
    }

    computeBlockHash(transactions, prevBlockHash, timestamp) {
      const transactionsHash = transactions.map(transaction => transaction.hash).join('');
      return this.hashFunction(`${transactionsHash}${prevBlockHash}${timestamp}`);
    }

    
  }
  
module.exports = Block;