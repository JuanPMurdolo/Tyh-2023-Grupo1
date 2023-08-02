class Hash{

    generateHash(value) {
        throw new Error('Se debe usar una clase que herede de Hash');
    }
}

module.exports = Hash;

/*
Composite 

Con Hash pasa algo similar a lo que pasa con Transaction, Hash tiene solo un método definido funcionando como una interfaz ya que el método de la clase padre no puede ser utilizado 
para configurar un método de hashing, para esto tenemos las clases MD5Hash y SHA256Hash que con la función Hash funcionan para setear el tipo de Hash que se va a utilizar al momento de cerrar bloques, transacciones, etc. 

En este caso también funciona como un composite porque su clase padre sirve como una interfaz común.

Strategy

El patrón de diseño Strategy se utiliza para definir una familia de algoritmos, encapsular cada uno de ellos y hacerlos intercambiables. 

En este caso, la clase Hash representa el contexto del patrón, mientras que las clases MD5Hash y SHA256Hash representan las estrategias concretas que implementan diferentes algoritmos de hash (MD5 y SHA-256, respectivamente). 
El uso de este patrón permite que las estrategias (algoritmos de hash) sean intercambiables sin que el cliente (en este caso, la clase Block o la clase Transaction) necesite preocuparse por los detalles de implementación de cada algoritmo.

*/
