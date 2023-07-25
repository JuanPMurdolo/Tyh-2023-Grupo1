const Node = require('../../src/models/Node');
const Blockchain = require('../../src/models/Blockchain');
const Block = require('../../src/models/Block');
const MD5Hash = require('../../src/models/MD5Hash');
const SHA256Hash = require('../../src/models/SHA256');
const transactionSimple = require('../../src/models/TransactionSimple');

const TransactionCoinbase = require('../../src/models/TransactionCoinbase');
const config = require('../../src/models/Config');

describe('Node', () => {
    let node;
    let sha256Strategy;
    let transaction;

    beforeEach(() => {
        node = new Node();
        sha256Strategy = new SHA256Hash();
        transaction = new TransactionCoinbase('TKN', 'Abraham', sha256Strategy, 'node');
    });

    test('should create a genesis block on initialization', () => {
        expect(node.openBlock.length).toBe(1);
        expect(node.openBlock[0] instanceof Block).toBe(true);
        expect(node.openBlock[0].previousHash).toBe("0");
    });

    test('should add a transaction to the open block', () => {
        //ya tenemos una CoinBase que se crea por defecto
        node.addTransaction(transaction);

        expect(node.openBlock[0].transactions.length).toBe(2);
        expect(node.openBlock[0].transactions[1]).toBe(transaction);
    });

    test('should create a new block after reaching 10 transactions in the open block', () => {
        for (let i = 0; i < 10; i++) {
            var transaction = new transactionSimple('tx', 'inAddress', 'outAddress', new SHA256Hash(), 'node');
            node.addTransaction(transaction);
        }

        expect(node.openBlock.length).toBe(2);
        expect(node.openBlock[1] instanceof Block).toBe(true);
        expect(node.openBlock[1].previousHash).toBe(node.openBlock[0].hash);
    });

    test('should add a new node to the connectedNodes', () => {
        const connectedNode = new Node();
        node.addNode(connectedNode);

        expect(node.connectedNodes.length).toBe(1);
        expect(node.connectedNodes[0]).toBe(connectedNode);
    });

    test('should validate the blockchain', () => {

        const blockchain = Blockchain.getInstance();
        const block1 = new Block(Date.now(), [], "0");
        const block2 = new Block(Date.now(), [], block1.hash);
        const transaction1 = new transactionSimple('tx', 'inAddress', 'outAddress', new SHA256Hash(), 'node');
        const transaction2 = new transactionSimple('tx', 'inAddress', 'outAddress', new SHA256Hash(), 'node');
        block2.transactions = [transaction1, transaction2];
        blockchain.blocks = [block1, block2];

        expect(node.isBlockchainValid()).toBe(true);
    });

    test('should validate the blockchain', () => {
        const node = new Node();

        for (let i = 0; i < 10; i++) {
            var transaction = new transactionSimple('tx', 'inAddress', 'outAddress', new SHA256Hash(), 'node');
            node.addTransaction(transaction);
        }
        console.log(node.blockchain.toString());
        expect(node.isBlockchainValid()).toBe(true);
    });
});