const Node = require('../../src/models/Node');
const Blockchain = require('../../src/models/Blockchain');
const Block = require('../../src/models/Block');
const MD5Hash = require('../../src/models/MD5Hash');
const SHA256Hash = require('../../src/models/SHA256');

const TransactionCoinbase = require('../../src/models/TransactionCoinbase');
const config = require('../../src/models/Config');
const transactionSimple = require('../../src/models/TransactionSimple');

describe('Node', () => {
    let node;
    let transaction;
    let sha256Strategy;

    beforeEach(() => {
        node = new Node();
        sha256Strategy = new SHA256Hash();

        transaction = new transactionSimple('tx', 'inAddress', 'outAddress', new SHA256Hash(), 'node');

    });

    it('should add a valid transaction to the latest block', () => {
        jest.spyOn(transaction, "isValid").mockReturnValue(true);

        node.addTransaction(transaction);
        expect(node.getLatestBlock().transactions.length).toEqual(2);
        expect(node.getLatestBlock().transactions[1]).toEqual(transaction);
    });

    it('should not add an invalid transaction to the latest block', () => {
        jest.spyOn(transaction, "isValid").mockReturnValue(false);

        node.addTransaction(transaction);
        expect(node.getLatestBlock().transactions.length).toEqual(1);
    });

    it('should create a new block when the latest block has reached the maximum number of transactions', () => {
        jest.spyOn(transaction, "isValid").mockReturnValue(false);

        for (let i = 0; i < 10; i++) {
            node.addTransaction(transaction);
        }
        expect(node.openBlock.length).toEqual(1);
        expect(node.getLatestBlock().transactions.length).toEqual(1);
    });
});