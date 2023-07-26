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

    test('debe crear un bloque génesis al crear un nodo', () => {
        expect(node.openBlock.length).toBe(1);
        expect(node.openBlock[0] instanceof Block).toBe(true);
        expect(node.openBlock[0].previousHash).toBe("0");
    });

    test('debe agregar una transacción a un bloque abierto', () => {
        //ya tenemos una CoinBase que se crea por defecto
        node.addTransaction(transaction);

        expect(node.openBlock[0].transactions.length).toBe(2);
        expect(node.openBlock[0].transactions[1]).toBe(transaction);
    });

    test('debe crear un nuevo bloque tras alcanzar 10 transacciones en el bloque abierto', () => {
        for (let i = 0; i < 10; i++) {
            var transaction = new transactionSimple('tx', 'inAddress', 'outAddress', new SHA256Hash(), 'node');
            node.addTransaction(transaction);
        }

        expect(node.openBlock.length).toBe(2);
        expect(node.openBlock[1] instanceof Block).toBe(true);
        expect(node.openBlock[1].previousHash).toBe(node.openBlock[0].hash);
    });

    test('debe cerrar el último bloque y crear uno nuevo si ha alcanzado el número máximo de transacciones', () => {
        for (let i = 0; i < 10; i++) {
            const transaction = new transactionSimple('tx', 'inAddress', 'outAddress', new SHA256Hash(), 'node');
            node.addTransaction(transaction);
        }
        expect(node.openBlock.length).toBe(2);
        expect(node.getLatestBlock().transactions.length).toBe(2);
    });


    test('debe conectar un nuevo nodo a otros nodos', () => {
        const connectedNode = new Node();
        node.addNode(connectedNode);

        expect(node.connectedNodes.length).toBe(1);
        expect(node.connectedNodes[0]).toBe(connectedNode);
    });

    test('debe devolver true si el bloque tiene todas sus transacciones validas', () => {
        const node = new Node();

        for (let i = 0; i < 30; i++) {
            var transaction = new transactionSimple('tx', 'inAddress', 'outAddress', new SHA256Hash(), 'node');
            node.addTransaction(transaction);
        }
        expect(node.blockchain.blocks[0].hasValidTransactions()).toBe(true);
    });

    test('debe agregar una transacción válida al último bloque v1', () => {
        node.addTransaction(transaction);
        expect(node.getLatestBlock().transactions.length).toBe(2);
        expect(node.getLatestBlock().transactions[1]).toBe(transaction);
    });

    test('debe agregar una transacción válida al último bloque v2', () => {
        jest.spyOn(transaction, "isValid").mockReturnValue(true);

        node.addTransaction(transaction);
        expect(node.getLatestBlock().transactions.length).toEqual(2);
        expect(node.getLatestBlock().transactions[1]).toEqual(transaction);
    });

    test('no debe agregar una transacción no válida al último bloque v1', () => {
        transaction.inAddress = 'invalidAddress';
        node.addTransaction(transaction);
        expect(node.getLatestBlock().transactions.length).toBe(1);
    });

    test('no debe agregar una transacción no válida al último bloque v2', () => {
        jest.spyOn(transaction, "isValid").mockReturnValue(false);

        node.addTransaction(transaction);
        expect(node.getLatestBlock().transactions.length).toEqual(1);
    });

    test('debe devolver false si el bloque génesis tiene transacciones no válidas', () => {
        node.blockchain.blocks[0].transactions[0].amount = 1000000;
        expect(node.isBlockchainValid()).toBe(false);
    });

    test('debe devolver false si algún bloque tiene transacciones no válidas', () => {
        node.blockchain.addBlock(new Block(Date.now(), [], 'previusHash'));
        node.blockchain.blocks[1].transactions[0].timestamp = 1384654;
        expect(node.isBlockchainValid()).toBe(false);
    });

    test('debe devolver false si algún bloque tiene un hash incorrecto', () => {
        node.blockchain.addBlock(new Block(Date.now(), [], 'previusHash'));
        node.blockchain.blocks[1].hash = 'incorrectHash';
        expect(node.isBlockchainValid()).toBe(false);
    });


    describe('isBlockchainValid', () => {
        test('should return true if the blockchain is valid', () => {
            // Crear un objeto de ejemplo para la blockchain
            const blockchain = {
                blocks: [
                    { hash: 'hash1', previousHash: null, hasValidTransactions: jest.fn().mockReturnValue(true), calculateHash: jest.fn().mockReturnValue('hash1') },
                    { hash: 'hash2', previousHash: 'hash1', hasValidTransactions: jest.fn().mockReturnValue(true), calculateHash: jest.fn().mockReturnValue('hash2') },
                    { hash: 'hash3', previousHash: 'hash2', hasValidTransactions: jest.fn().mockReturnValue(true), calculateHash: jest.fn().mockReturnValue('hash3') },
                ]
            };

            // Crear un objeto de ejemplo de la clase Block
            const node = new Node();

            // Asignar la blockchain de ejemplo al objeto block
            node.blockchain = blockchain;

            // Ejecutar la función isBlockchainValid()
            const result = node.isBlockchainValid();

            // Verificar que el resultado sea true
            expect(result).toBe(true);
        });

        test('should return false if a block has invalid transactions', () => {
            // Crear un objeto de ejemplo para la blockchain
            const blockchain = {
                blocks: [
                    { hash: 'hash1', previousHash: null, hasValidTransactions: jest.fn().mockReturnValue(true), calculateHash: jest.fn().mockReturnValue('hash1') },
                    { hash: 'hash2', previousHash: 'hash1', hasValidTransactions: jest.fn().mockReturnValue(false), calculateHash: jest.fn().mockReturnValue('hash2') },
                ]
            };

            // Crear un objeto de ejemplo de la clase Block
            const node = new Node();

            // Asignar la blockchain de ejemplo al objeto block
            node.blockchain = blockchain;

            // Ejecutar la función isBlockchainValid()
            const result = node.isBlockchainValid();

            // Verificar que el resultado sea false
            expect(result).toBe(false);
        });

        test('should return false if a block has an incorrect hash or previousHash', () => {
            // Crear un objeto de ejemplo para la blockchain
            const blockchain = {
                blocks: [
                    { hash: 'hash1', previousHash: null, hasValidTransactions: jest.fn().mockReturnValue(true), calculateHash: jest.fn().mockReturnValue('hash1') },
                    { hash: 'hash2', previousHash: 'incorrectHash', hasValidTransactions: jest.fn().mockReturnValue(true), calculateHash: jest.fn().mockReturnValue('hash2') },
                ]
            };

            // Crear un objeto de ejemplo de la clase Block
            const node = new Node();

            // Asignar la blockchain de ejemplo al objeto block
            node.blockchain = blockchain;

            // Ejecutar la función isBlockchainValid()
            const result = node.isBlockchainValid();

            // Verificar que el resultado sea false
            expect(result).toBe(false);
        });
    });
});