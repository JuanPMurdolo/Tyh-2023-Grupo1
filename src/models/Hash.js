class Hash{
    constructor() {
        this.name = '';
    }
    
    hash() {
        throw new Error('Se debe usar una clase que herede de Hash');
    }
}

module.exports = Hash;