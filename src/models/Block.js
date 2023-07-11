class Block {
    constructor(timestamp, transactions=[], hash, previousHash) {
      this.timestamp = timestamp;
      this.transactions = transactions;
      this.hash = computeBlockHash(previousHash);
      this.previousHash = previousHash;
      this.status = 'open';
    }

    addPreviousHash(){
      return this.transactions.length > 0 ? this.transactions[this.transactions.length - 1].hash : '';
    }

    blockClosure(){
        const previousHash = this.addPreviousHash();
        const timestamp = Date.now();
    }

    computeBlockHash(prevBlockHash) {
      //to do
      //llamar al hash
      //retornar el hash del bloque s
      return 1;
      }

      hashFunction(data){
        //to do
      }

    
  }
  
module.exports = Block;