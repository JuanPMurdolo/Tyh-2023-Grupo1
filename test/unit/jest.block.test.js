const Node = require('../../src/models/Node');
const Block = require('../../src/models/Block');
const MD5Hash = require('../../src/models/MD5Hash');
const SHA256Hash = require('../../src/models/SHA256');
const TransactionSimple = require('../../src/models/TransactionSimple');

const TransactionCoinbase = require('../../src/models/TransactionCoinbase');
const Config = require('../../src/models/Config');


describe('Block', () => {
    let block;
    let sha256Strategy;
    let transaction1;
    let transaction2;

    beforeEach(() => {
        sha256Strategy = new SHA256Hash();
        block = new Block(Date.now(), [],);
        transaction1 = new TransactionSimple('tx', 'inAddress', 'outAddress', new SHA256Hash(), 'node');
        transaction2 = new TransactionSimple('tx', 'inAddress', 'outAddress', new SHA256Hash(), 'node');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('debe devolver la cadena JSON del bloque', () => {
        expect(block.toString()).toBe(JSON.stringify(block));
    });

    test('debe verificar si todas las transacciones en el bloque son válidas', () => {
        jest.spyOn(transaction1, "isValid").mockReturnValue(true);
        jest.spyOn(transaction2, "isValid").mockReturnValue(false);

        block.transactions = [transaction1, transaction2];

        expect(block.hasValidTransactions()).toBe(false);
        expect(transaction1.isValid).toHaveBeenCalledTimes(1);
        expect(transaction2.isValid).toHaveBeenCalledTimes(1);
    });

    test('debe agregar una transacción al bloque', () => {
        const transaction = new TransactionSimple('tx', 'inAddress', 'outAddress', new SHA256Hash(), 'node');
        jest.spyOn(transaction, "isValid").mockReturnValue(true);

        block.addTransaction(transaction);

        expect(block.transactions).toContain(transaction);
        expect(transaction.isValid).toHaveBeenCalledTimes(1);
    });

    test('debe lazar una excepción al agregar una transacción inválida', () => {
        const transaction = new TransactionSimple('tx', 'inAddress', 'outAddress', new SHA256Hash(), 'node');
        transaction.isValid = jest.fn(() => false);

        expect(() => {
            block.addTransaction(transaction);
        }).toThrow(Error("Transacción no válida. No se agregó al bloque abierto."));
    });

    test('debe devolver el hash concatenado de todas las transacciones en el bloque', () => {
        //seteamos dos strings para probar la concatenacion
        transaction1.hash = 'hash1';
        transaction2.hash = 'hash2';
        block.transactions = [transaction1, transaction2];

        expect(block.getHashesTransactions()).toBe('hash1hash2');
    });

    test('debe devolver el valor hash correcto', () => {
        const block = new Block('2021-10-01', [], 'previousHash123');

        // Mockear la función de generación de hash
        Config.hashDefault.generateHash = jest.fn().mockReturnValue('mockedHash');
        const result = block.calculateHash();

        // Verificar que la función de generación de hash haya sido llamada con los datos correctos
        expect(Config.hashDefault.generateHash).toHaveBeenCalledWith(`previousHash1232021-10-01${block.getHashesTransactions()}`);

        expect(result).toBe('mockedHash');
    });

    test('debe cerrar el bloque correctamente', () => {
        // Crear transacciones ficticias
        const transaction1 = { status: 'pending', closeTransaction: jest.fn(), hash: 'hash1' };
        const transaction2 = { status: 'closed', closeTransaction: jest.fn(), hash: 'hash2' };

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

    test('debe devolver el hash anterior del último bloque cerrado', () => {
        // Crear un objeto de ejemplo para la blockchain
        const blocks = [
            { hash: 'hash1', status: 'closed' },
            { hash: 'hash2', status: 'closed' },
            { hash: 'hash3', status: 'open' },
        ];

        // Crear un objeto node de ejemplo
        const node = {
            blocks: blocks
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

    test('debe devolver una cadena vacía cuando el hash anterior no está definido o es nulo', () => {
        // Crear un objeto de ejemplo para la blockchain
        const blocks = [
            { hash: 'hash1', status: 'open' },
            { hash: undefined, status: 'closed' },
        ];


        const node = {
            blocks: blocks
        };

        const block = new Block();

        // Mockear la función calculateHash() del objeto block
        block.calculateHash = jest.fn().mockReturnValue('mockedHash');

        // Ejecutar la función addPreviousHash()
        const result = block.addPreviousHash(node);

        // Verificar que el resultado sea una cadena vacía
        expect(result).toBe('');
    });

});