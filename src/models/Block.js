class Block {
    constructor(timestamp, transactions=[], previousHash) {
      this.timestamp = timestamp;
      this.transactions = transactions;
      this.hash = computeBlockHash(previousHash);
      this.previousHash = previousHash;
      this.status = 'open';
    }

    addPreviousHash(){
      return true;
    }

    blockClosure(){
        const previousHash = this.addPreviousHash();
        const timestamp = Date.now();
    }

    computeBlockHash(block) {
      //Se confirman todas las transacciones cerradas primero
      block.transactions.forEach(transaction => {
        if (transaction.status === 'closed') {
          //Se calcula el hash de la transacciones
          transaction.hash = this.hashFunction(transaction);
        }
      });
      
      //to do
      block.status = 'closed';
      
      //Se calcula el hash del bloque
      //retornar el hash del bloque
      return 1;
      }

      hashFunction(data, hash){
        
      }
    
  }
  
module.exports = Block;