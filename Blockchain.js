const { SHA256, MD5 } = require('jshashes');
const {v4: uuidv4} = require('uuid');

class Blockchain {
    constructor() {
      if (Blockchain.instance) {
          return Blockchain.instance;
        }
        this.chain = [];
        this.pendingTransactions = [];
        this.currentBlockTransactions = [];
        this.nodes = [];
        this.hashFunction = SHA256;
        Blockchain.instance = this;
      }

    
    generateUUID() {
        return uuidv4();
    } 

}
    module.exports = Blockchain;