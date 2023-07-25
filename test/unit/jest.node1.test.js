const Blockchain = require('../../src/models/Blockchain');
const Block = require('../../src/models/Block');
const MD5Hash = require('../../src/models/MD5Hash');
const TransactionCoinbase = require('../../src/models/TransactionCoinbase');
const config = require('../../src/models/Config');
const Node = require('../../src/models/Node');

describe('Node', () => {
    let node;

    beforeEach(() => {
        node = new Node();
    });

    it('should create a genesis block', () => {
        const genesisBlock = node.createGenesisBlock();
        expect(genesisBlock.index).toBe(0);
        expect(genesisBlock.timestamp).toBe(Date.now());
        expect(genesisBlock.transactions).toEqual([]);
        expect(genesisBlock.previousHash).toBe('0');
    });

    it('should add a transaction to the open block', () => {
        const transaction = new TransactionCoinbase('0', '0');
        node.addTransaction(transaction);
        const openBlock = node.getLatestBlock();
        expect(openBlock.transactions).toContain(transaction);
    });

    it('should close the open block and add it to the blockchain', () => {
        const transaction = new TransactionCoinbase('0', '0');
        node.addTransaction(transaction);
        node.createNewBlock();
        const openBlock = node.getLatestBlock();
        const blockchain = node.blockchain;
        expect(blockchain.blocks).toContain(openBlock);
    });

    it('should broadcast a block to the network', () => {
        const block = new Block(Date.now(), [], '0');
        node.broadcast(block);
        expect(node.connectedNodes).toHaveLength(1);
    });

    it('should check if the blockchain is valid', () => {
        const genesisBlock = node.createGenesisBlock();
        node.blockchain.addBlock(genesisBlock);
        const block = new Block(Date.now(), [], genesisBlock.hash);
        node.blockchain.addBlock(block);
        expect(node.isBlockchainValid()).toBe(true);
    });
});