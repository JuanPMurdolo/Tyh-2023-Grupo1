const Node = require('../../src/models/Node');
const Blockchain = require('../../src/models/Blockchain');
const Block = require('../../src/models/Block');
const MD5Hash = require('../../src/models/MD5Hash');
const SHA256Hash = require('../../src/models/SHA256');
const TransactionSimple = require('../../src/models/TransactionSimple');

const TransactionCoinbase = require('../../src/models/TransactionCoinbase');
const Config = require('../../src/models/Config');


describe('Block', () => {
    let block;
    let sha256Strategy;

    beforeEach(() => {
        sha256Strategy = new SHA256Hash();
        block = new Block(Date.now(), [],);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return the string representation of the block', () => {
        expect(block.toString()).toBe(JSON.stringify(block));
    });

    test('should check if all transactions in the block are valid', () => {
        const transaction1 = new TransactionSimple('tx', 'inAddress', 'outAddress', new SHA256Hash(), 'node');
        const transaction2 = new TransactionSimple('tx', 'inAddress', 'outAddress', new SHA256Hash(), 'node');

        jest.spyOn(transaction1, "isValid").mockReturnValue(true);
        jest.spyOn(transaction2, "isValid").mockReturnValue(false);

        block.transactions = [transaction1, transaction2];

        expect(block.hasValidTransactions()).toBe(false);
        expect(transaction1.isValid).toHaveBeenCalledTimes(1);
        expect(transaction2.isValid).toHaveBeenCalledTimes(1);
    });

    test('should add a transaction to the block', () => {
        const transaction = new TransactionSimple('tx', 'inAddress', 'outAddress', new SHA256Hash(), 'node');
        jest.spyOn(transaction, "isValid").mockReturnValue(true);

        block.addTransaction(transaction);

        expect(block.transactions).toContain(transaction);
        expect(transaction.isValid).toHaveBeenCalledTimes(1);
    });

    test('should not add an invalid transaction to the block', () => {
        const transaction = new TransactionSimple('tx', 'inAddress', 'outAddress', new SHA256Hash(), 'node');
        jest.spyOn(transaction, "isValid").mockReturnValue(false);

        console.log = jest.fn(); // Mock console.log
        const expectedLogMessage = 'Transacción no válida. No se agregó al bloque abierto.';

        block.addTransaction(transaction);

        expect(block.transactions).not.toContain(transaction);
        expect(transaction.isValid).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith(expectedLogMessage);
    });

    test('should return the concatenated hash of all transactions in the block', () => {
        const transaction1 = new TransactionSimple('tx', 'inAddress', 'outAddress', new SHA256Hash(), 'node');
        const transaction2 = new TransactionSimple('tx', 'inAddress', 'outAddress', new SHA256Hash(), 'node');

        //seteamos dos strings para probar la concatenacion
        transaction1.hash = 'hash1';
        transaction2.hash = 'hash2';
        block.transactions = [transaction1, transaction2];

        expect(block.getHashesTransactions()).toBe('hash1hash2');
    });

    describe('Block', () => {
        test('should return the correct hash value', () => {
            // Crear un objeto block con valores de ejemplo
            const block = new Block('2021-10-01', [], 'previousHash123');

            // Mockear la función de generación de hash
            Config.hashDefault.generateHash = jest.fn().mockReturnValue('mockedHash');

            // Ejecutar la función calculateHash()
            const result = block.calculateHash();

            // Verificar que la función de generación de hash haya sido llamada con los datos correctos
            expect(Config.hashDefault.generateHash).toHaveBeenCalledWith(`previousHash1232021-10-01${block.getHashesTransactions()}`);

            // Verificar que el resultado sea el valor de hash retornado por la función de generación de hash
            expect(result).toBe('mockedHash');
        });
    });

    describe('Block', () => {
        test('should close the block correctly', () => {
            // Crear transacciones ficticias
            const transaction1 = {
                status: 'pending',
                closeTransaction: jest.fn(),
                hash: 'hash1'
            };
            const transaction2 = {
                status: 'closed',
                closeTransaction: jest.fn(),
                hash: 'hash2'
            };

            // Crear un objeto block con transacciones ficticias
            const block = new Block('2021-10-01', [transaction1, transaction2], 'previousHash123');

            // Mockear la función calculateHash()
            block.calculateHash = jest.fn().mockReturnValue('mockedHash');

            // Ejecutar la función closeBlock()
            block.closeBlock();

            // Verificar que la función closeTransaction() haya sido llamada solo para la transacción pendiente
            expect(transaction1.closeTransaction).toHaveBeenCalled();
            expect(transaction2.closeTransaction).not.toHaveBeenCalled();

            // Verificar que el hash del bloque haya sido actualizado correctamente
            expect(block.hash).toBe('mockedHash');

            // Verificar que el estado del bloque sea 'closed'
            expect(block.status).toBe('closed');
        });
    });

    describe('addPreviousHash', () => {
        test('should return the previous hash of the last closed block', () => {
            // Crear un objeto de ejemplo para la blockchain
            const blockchain = {
                blocks: [
                    { hash: 'hash1', status: 'closed' },
                    { hash: 'hash2', status: 'closed' },
                    { hash: 'hash3', status: 'open' },
                ]
            };

            // Crear un objeto node de ejemplo
            const node = {
                blockchain: blockchain
            };

            // Crear un objeto de ejemplo de la clase Block
            const block = new Block();

            // Mockear la función calculateHash() del objeto block
            block.calculateHash = jest.fn().mockReturnValue('mockedHash');

            // Ejecutar la función addPreviousHash()
            const result = block.addPreviousHash(node);

            // Verificar que el resultado sea el hash del último bloque cerrado de la blockchain
            expect(result).toBe('hash3');
        });

        test('should return an empty string when previous hash is undefined or null', () => {
            // Crear un objeto de ejemplo para la blockchain
            const blockchain = {
                blocks: [
                    { hash: 'hash1', status: 'open' },
                    { hash: undefined, status: 'closed' },
                ]
            };

            // Crear un objeto node de ejemplo
            const node = {
                blockchain: blockchain
            };

            // Crear un objeto de ejemplo de la clase Block
            const block = new Block();

            // Mockear la función calculateHash() del objeto block
            block.calculateHash = jest.fn().mockReturnValue('mockedHash');

            // Ejecutar la función addPreviousHash()
            const result = block.addPreviousHash(node);

            // Verificar que el resultado sea una cadena vacía
            expect(result).toBe('');
        });
    });

});