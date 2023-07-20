class Block {
    constructor(timestamp, transactions=[]) {
      this.timestamp = timestamp;
      this.transactions = transactions;
      this.hash = '';
      this.previousHash = this.addPreviousHash();
      this.status = 'open';
    }

    addPreviousHash(node){
      //previous hash va a ser el ultimo bloque cerrado de la blockchain
      const previousHash = node.blockchain.blocks[node.blockchain.blocks.length - 1].hash;
      //si previous hash esta vacio o no existe retornamos vacio
      if (previousHash === undefined || previousHash === null){
        return '';
      } else {
      return previousHash;
      }
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
      var hash = 0;
      this.transactions.forEach(transaction => {
        if (transaction.status === 'pending') {
          transaction.closeTransaction();
          hash += transaction.hash;
        }
        console.log(transaction);
      });
      this.hash = hash;
      this.status = 'closed';
    }

    toString() {
      return JSON.stringify(this);
    }
    
  }
  
module.exports = Block;