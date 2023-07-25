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
        const node = new Node();

        for (let i = 0; i < 30; i++) {
            var transaction = new transactionSimple('tx', 'inAddress', 'outAddress', new SHA256Hash(), 'node');
            node.addTransaction(transaction);
        }
        expect(node.isBlockchainValid()).toBe(true);
    });

    test('debe devolver true si el bloque tiene todas sus transacciones validas', () => {
        const node = new Node();

        for (let i = 0; i < 30; i++) {
            var transaction = new transactionSimple('tx', 'inAddress', 'outAddress', new SHA256Hash(), 'node');
            node.addTransaction(transaction);
        }
        expect(node.blockchain.blocks[0].hasValidTransactions()).toBe(true);
    });

    describe('Node', () => {
        let node;
        let transaction;
        let sha256Strategy;

        beforeEach(() => {
            node = new Node();
            sha256Strategy = new SHA256Hash();
            transaction = new transactionSimple('tx', 'inAddress', 'outAddress', new SHA256Hash(), 'node');
        });

        it('debe agregar una transacción válida al último bloque', () => {
            node.addTransaction(transaction);
            expect(node.getLatestBlock().transactions.length).toBe(2);
            expect(node.getLatestBlock().transactions[1]).toBe(transaction);
        });

        it('no debe agregar una transacción no válida al último bloque', () => {
            transaction.inAddress = 'invalidAddress';
            node.addTransaction(transaction);
            expect(node.getLatestBlock().transactions.length).toBe(1);
        });

        it('should close the latest block and create a new one if it has reached the maximum number of transactions', () => {
            for (let i = 0; i < 10; i++) {
                const transaction = new transactionSimple('tx', 'inAddress', 'outAddress', new SHA256Hash(), 'node');
                node.addTransaction(transaction);
            }
            expect(node.openBlock.length).toBe(2);
            expect(node.getLatestBlock().transactions.length).toBe(2);
        });

        it('should broadcast a closed block to the blockchain', () => {
            for (let i = 0; i < 10; i++) {
                const transaction = new transactionSimple('tx', 'inAddress', 'outAddress', new SHA256Hash(), 'node');
                node.addTransaction(transaction);
            }
            expect(node.blockchain.blocks.length).toBe(9);
        });

        it('should add a connected node', () => {
            const newNode = new Node();
            node.addNode(newNode);
            expect(node.connectedNodes.length).toBe(1);
            expect(node.connectedNodes[0]).toBe(newNode);
        });

        it('should return false if the genesis block has invalid transactions', () => {
            node.blockchain.blocks[0].transactions[0].amount = 1000000;
            expect(node.isBlockchainValid()).toBe(false);
        });

        it('should return false if any block has invalid transactions', () => {
            node.blockchain.addBlock(new Block(Date.now(), [], 'previusHash'));
            node.blockchain.blocks[1].transactions[0].timestamp = 1384654;
            expect(node.isBlockchainValid()).toBe(false);
        });

        it('should return false if any block has an incorrect hash', () => {
            node.blockchain.addBlock(new Block(Date.now(), [], 'previusHash'));
            node.blockchain.blocks[1].hash = 'incorrectHash';
            expect(node.isBlockchainValid()).toBe(false);
        });
    });
});