const { SHA256, MD5 } = require('jshashes');
const {v4: uuidv4} = require('uuid');
const Block = require('./Block');
const Transaction = require('./Transaction');
const CompositeTransaction = require('./TransactionComposite');

class Blockchain {
    constructor(blocks = []) {
      this.blocks = blocks;
      }












broadcastBlock(block) { 
  this.nodes.forEach(node => node.addBlock(block));
}

}

module.exports = Blockchain;