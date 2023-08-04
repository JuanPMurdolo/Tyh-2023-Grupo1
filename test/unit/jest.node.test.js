const Node = require('../../src/models/Node');
const Block = require('../../src/models/Block');
const MD5Hash = require('../../src/models/MD5Hash');
const SHA256Hash = require('../../src/models/SHA256');
const TransactionSimple = require('../../src/models/TransactionSimple');
const TransactionComposite = require('../../src/models/TransactionComposite');

const TransactionCoinbase = require('../../src/models/TransactionCoinbase');
const config = require('../../src/models/Config');

describe('Nodo', () => {
    let node;
    let sha256Strategy;
    let transaction;

    beforeEach(() => {
        node = new Node();
        sha256Strategy = new SHA256Hash();
        transaction = new TransactionCoinbase('TKN', 'Abraham', sha256Strategy, 'node');
    });

    test('debe crear un bloque génesis al crear un nodo', () => {
        expect(node.blocks.length).toBe(1);
        expect(node.blocks[0] instanceof Block).toBe(true);
        expect(node.blocks[0].previousHash).toBe("0");
    });

    test('debe agregar una transacción a un bloque abierto', () => {
        //ya tenemos una CoinBase que se crea por defecto
        node.addTransaction(transaction);

        expect(node.blocks[0].transactions.length).toBe(2);
        expect(node.blocks[0].transactions[1]).toBe(transaction);
    });

    test('debe crear un nuevo bloque tras alcanzar 10 transacciones en el bloque abierto', () => {
        for (let i = 0; i < 10; i++) {
            var transaction = new TransactionSimple('tx', 'inAddress', 'outAddress', new SHA256Hash(), 'node');
            node.addTransaction(transaction);
        }

        expect(node.blocks.length).toBe(2);
        expect(node.blocks[1] instanceof Block).toBe(true);
        expect(node.blocks[1].previousHash).toBe(node.blocks[0].hash);
    });

    test('debe cerrar el último bloque y crear uno nuevo si ha alcanzado el número máximo de transacciones', () => {
        for (let i = 0; i < 10; i++) {
            const transaction = new TransactionSimple('tx', 'inAddress', 'outAddress', new SHA256Hash(), 'node');
            node.addTransaction(transaction);
        }
        expect(node.blocks.length).toBe(2);
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
            var transaction = new TransactionSimple('tx', 'inAddress', 'outAddress', new SHA256Hash(), 'node');
            node.addTransaction(transaction);
        }
        expect(node.blocks[0].hasValidTransactions()).toBe(true);
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

    test('debe lazar una excepción al agregar una transacción inválida', () => {
        transaction.isValid = jest.fn(() => false);

        expect(() => {
            node.addTransaction(transaction);
        }).toThrow(Error("Transacción no válida. No se agregó al bloque abierto."));
    });

    test('debe devolver false si algún bloque tiene transacciones no válidas', () => {
        node.addBlock(new Block(Date.now(), [], 'previusHash'));
        node.blocks[1].transactions[0].timestamp = 1384654;
        expect(node.isBlockchainValid()).toBe(false);
    });

    test('debe devolver false si algún bloque tiene un hash incorrecto', () => {
        node.addBlock(new Block(Date.now(), [], 'previusHash'));
        node.blocks[1].hash = 'incorrectHash';
        expect(node.isBlockchainValid()).toBe(false);
    });


    test('debería devolver true si la Blockchain es válida', () => {
        const blocks = [
            { hash: 'hash1', previousHash: null, hasValidTransactions: jest.fn().mockReturnValue(true), calculateHash: jest.fn().mockReturnValue('hash1') },
            { hash: 'hash2', previousHash: 'hash1', hasValidTransactions: jest.fn().mockReturnValue(true), calculateHash: jest.fn().mockReturnValue('hash2') },
            { hash: 'hash3', previousHash: 'hash2', hasValidTransactions: jest.fn().mockReturnValue(true), calculateHash: jest.fn().mockReturnValue('hash3') },
        ];

        node.blocks = blocks;

        const result = node.isBlockchainValid();
        expect(result).toBe(true);
    });

    test('debe devolver false si un bloque tiene transacciones no válidas', () => {
        const blocks = [
            { hash: 'hash1', previousHash: null, hasValidTransactions: jest.fn().mockReturnValue(true), calculateHash: jest.fn().mockReturnValue('hash1') },
            { hash: 'hash2', previousHash: 'hash1', hasValidTransactions: jest.fn().mockReturnValue(false), calculateHash: jest.fn().mockReturnValue('hash2') },
        ];

        node.blocks = blocks;

        const result = node.isBlockchainValid();
        expect(result).toBe(false);
    });

    test('debe devolver falso si un bloque tiene un previousHash incorrecto', () => {
        const blocks = [
            { hash: 'hash1', previousHash: null, hasValidTransactions: jest.fn().mockReturnValue(true), calculateHash: jest.fn().mockReturnValue('hash1') },
            { hash: 'hash2', previousHash: 'incorrectHash', hasValidTransactions: jest.fn().mockReturnValue(true), calculateHash: jest.fn().mockReturnValue('hash2') },
        ];

        node.blocks = blocks;

        const result = node.isBlockchainValid();
        expect(result).toBe(false);
    });

    test('debe lanzar una excepción al recibir un bloque no válido', () => {

        const invalidBlock = new Block();
        invalidBlock.isValid = jest.fn(() => false);

        expect(() => {
            node.receiveBroadcast(invalidBlock);
        }).toThrow(Error("Bloque no valido"));
    });

    // Función para generar una transacción aleatoriamente de tipo TransactionComposite o TransactionSimple
    function generateTestTransaction() {
        const randomNum = Math.random(); // Generamos un número aleatorio entre 0 y 1

        if (randomNum < 0.5) {
            return new TransactionComposite(1, 'senderAddress', 'receiverAddress', { generateHash: jest.fn() }, 'node');
        } else {
            return new TransactionSimple('txIn', 'senderAddress', 'receiverAddress', { generateHash: jest.fn() }, 'node');
        }
    }

    describe('Broadcasting', () => {
        let node1, node2, node3;

        beforeEach(() => {
            node1 = new Node();
            node2 = new Node();
            node3 = new Node();

            node1.addNode(node2);
            node1.addNode(node3);

            node2.addNode(node1);
            node2.addNode(node3);

            node3.addNode(node1);
            node3.addNode(node2);
        });

        test('los tres nodos deben tener los mismos bloques cerrados en su blockchain', () => {
            // Generamos algunas transacciones para cada nodo
            const transactionsNode1 = Array(15).fill(null).map(generateTestTransaction);
            const transactionsNode2 = Array(12).fill(null).map(generateTestTransaction);
            const transactionsNode3 = Array(16).fill(null).map(generateTestTransaction);

            // Agregamos las transacciones a los nodos
            transactionsNode1.forEach(transaction => node1.addTransaction(transaction));
            transactionsNode2.forEach(transaction => node2.addTransaction(transaction));
            transactionsNode3.forEach(transaction => node3.addTransaction(transaction));

            // Comprobamos que la blockchain de cada nodo sea idéntica
            expect(node1.blockchain).toEqual(node2.blockchain);
            expect(node1.blockchain).toEqual(node3.blockchain);
            expect(node2.blockchain).toEqual(node3.blockchain);
        });
    });

});