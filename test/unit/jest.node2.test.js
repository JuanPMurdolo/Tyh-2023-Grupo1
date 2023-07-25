const Blockchain = require('../../src/models/Blockchain');
const Block = require('../../src/models/Block');
const MD5Hash = require('../../src/models/MD5Hash');
const TransactionCoinbase = require('../../src/models/TransactionCoinbase');
const config = require('../../src/models/Config');
const Node = require('../../src/models/Node');

describe('Node', () => {
    let node;
    let transaction;

    beforeEach(() => {
        node = new Node();
        transaction = new Transaction('senderAddress', 'receiverAddress', 10);
    });

    it('should create a genesis block when initialized', () => {
        expect(node.openBlock.length).toEqual(1);
        expect(node.openBlock[0].previousHash).toEqual('0');
    });

    it('should add a valid transaction to the latest block', () => {
        spyOn(transaction, 'isValid').and.returnValue(true);
        node.addTransaction(transaction);
        expect(node.getLatestBlock().transactions.length).toEqual(1);
        expect(node.getLatestBlock().transactions[0]).toEqual(transaction);
    });

    it('should not add an invalid transaction to the latest block', () => {
        spyOn(transaction, 'isValid').and.returnValue(false);
        node.addTransaction(transaction);
        expect(node.getLatestBlock().transactions.length).toEqual(0);
    });

    it('should create a new block when the latest block has reached the maximum number of transactions', () => {
        spyOn(transaction, 'isValid').and.returnValue(true);
        for (let i = 0; i < 10; i++) {
            node.addTransaction(transaction);
        }
        expect(node.openBlock.length).toEqual(2);
        expect(node.getLatestBlock().transactions.length).toEqual(0);
    });
});