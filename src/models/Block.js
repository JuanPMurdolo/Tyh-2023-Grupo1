class Block {
    constructor(timestamp, transactions=[], previousHash='') {
      this.timestamp = timestamp;
      this.transactions = transactions;
      this.hash = '';
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
          //Se agrega el hash de la transaccion al hash del bloque
          block.hash += transaction.hash;
        }
      });
      //to do
      block.status = 'closed';
      //Se calcula el hash final del bloque

      //retornar el hash del bloque
      return 1;
      }

      hashFunction(data, hash){
        
      }

    closeBlock() {
      this.status = 'closed';
    }
    
  }
  
module.exports = Block;